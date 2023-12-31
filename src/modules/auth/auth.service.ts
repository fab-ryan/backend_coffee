import { Injectable } from '@nestjs/common';
import { GeneratePassword, LoginDto } from './dto/create-auth.dto';

import { ResponseService } from '@utils';
import { UserService } from '@modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
import { GenerateTokenService } from '@shared/generate-token-control.service';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly responseService: ResponseService,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly generateTokenService: GenerateTokenService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user) {
      throw this.responseService.Response({
        success: false,
        statusCode: 404,
        message: this.i18nService.translate(
          'response.INVALID_EMAIL_OR_PASSWORD',
        ),
      });
    }
    const isMatch = bcrypt.compareSync(loginDto.password, user.password);
    if (!isMatch) {
      throw this.responseService.Response({
        success: false,
        statusCode: 401,
        message: this.i18nService.translate(
          'response.INVALID_EMAIL_OR_PASSWORD',
        ),
      });
    }

    if (isMatch && user) {
      return user;
    }
    return null;
  }

  async login(data: LoginDto) {
    try {
      const user = await this.validateUser(data);
      if (!user) {
        return this.responseService.Response({
          success: false,
          statusCode: 401,
          message: this.i18nService.translate(
            'response.INVALID_EMAIL_OR_PASSWORD',
          ),
        });
      }
      return await this.loginSuccess(user);
    } catch (error) {
      return this.responseService.Response({
        success: false,
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async loginSuccess(user: any) {
    const { email, name, id, phone, status, role } = user;
    const payload = { email, name, id, phone, status, role: role };
    return this.responseService.Response({
      success: true,
      statusCode: 200,
      data: {
        access_token: await this.generateTokenService.generateToken(payload),
      },
      message: this.i18nService.translate('response.LOGIN_SUCCESSFULLY'),
    });
  }

  async logout() {
    return this.responseService.Response({
      success: true,
      statusCode: 200,
      data: null,
      message: this.i18nService.translate('response.LOGOUT_SUCCESSFULLY'),
    });
  }

  async generatePassword(generateDto: GeneratePassword): Promise<string> {
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(generateDto?.password, saltRounds);
    return hashedPassword;
  }

  async authUser(email: string) {
    const user = await this.userService.findUserByEmail(email);
    user.password = undefined;
    if (!user) {
      throw this.responseService.Response({
        success: false,
        statusCode: 404,
        message: this.i18nService.translate('response.USER_NOT_FOUND'),
      });
    }
    return this.responseService.Response({
      success: true,
      statusCode: 200,
      data: user,
      message: this.i18nService.translate('response.USER_FOUND'),
    });
  }
}
