import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@modules/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get('JWT_SECRET_KEY'),
    });
  }
  async validate({ iat, exp, email }): Promise<User> {
    const timeDiff = exp - iat;

    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this._userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
