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
import {
  AssociativeArray,
  filterQueryBuilderFromRequest,
  formatUsername,
  PaginateHelper,
} from '@utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';

import * as bcrypt from 'bcrypt';

import config from '@config/config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly userPaginate: PaginateHelper<User>,
  ) {}

  async create(createUserDto: CreateUserDto, lang: string) {
    try {
      const username = formatUsername(createUserDto.username);

      const { email, name, password, phone } = createUserDto;

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

      const hashedPassword = await bcrypt.hash(
        password,
        config().jwt_salt_round,
      );
      const user = this.userRepository.create({
        username,
        email,
        name,
        phone,
        password: hashedPassword,
      });
      const result = await this.userRepository.save(user);
      result.password;
      return this.responseService.Response({
        success: true,
        statusCode: 201,
        data: result,
        message: this.i18n.translate('response.USER_CREATED', { lang }),
      });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async findAll(filters?: AssociativeArray) {
    try {
      const q = this.userRepository
        .createQueryBuilder('users')
        .select([
          'users.id',
          'users.name',
          'users.username',
          'users.email',
          'users.phone',
          'users.status',
          'users.created_at',
          'users.deleted_at',
        ])
        .orderBy('users.created_at', 'DESC');

      filterQueryBuilderFromRequest(q, filters);

      const userPaginate = await this.userPaginate.run(q);
      return this.responseService.Response({
        data: userPaginate,
        message: this.i18n.translate('response.USER_LIST'),
      });
    } catch (e) {
      return this.responseService.Response({
        message: e.message,
        statusCode: 400,
        success: false,
      });
    }
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
