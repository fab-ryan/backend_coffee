import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '@utils/response/response.service';
import { formatUsername } from '@utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async create(createUserDto: CreateUserDto, lang: string) {
    try {
      const username = formatUsername(createUserDto.username);

      const { email, name } = createUserDto;

      const checkUser = await this.userRepository.findOne({
        where: { username },
        select: ['id'],
        withDeleted: true,
      });
      if (checkUser) {
        return this.responseService.Response({
          success: false,
          statusCode: 400,
          data: null,
          message: this.i18n.translate('response.USERNAME_EXITS', { lang }),
        });
      }
      const checkUserEmail = await this.userRepository.findOne({
        where: { email: email },
        select: ['id'],
        withDeleted: true,
      });
      if (checkUserEmail) {
        return this.responseService.Response({
          success: false,
          statusCode: 400,
          data: null,
          message: this.i18n.translate('response.USER_EMAIL_EXITS', { lang }),
        });
      }
      const user = this.userRepository.create(createUserDto);
      const result = await this.userRepository.save(user);
      return this.responseService.Response({
        success: true,
        statusCode: 201,
        data: result,
        message: 'User created successfully',
      });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
