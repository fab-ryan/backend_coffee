import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ResponseService } from '@utils/response/response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginateHelper } from '@utils';
import { AccessContorlService } from '@shared/access-control.service';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    ResponseService,
    PaginateHelper,
    AccessContorlService,
    AuthenticateMiddleware,
  ],
})
export class UserModule {}
