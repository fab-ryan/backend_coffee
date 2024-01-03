import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '@modules/user/user.service';
import { PaginateHelper, ResponseService } from '@utils';
import { LocalStrategy } from '@guards/local.auth.guard';
import { GenerateTokenService } from '@shared/generate-token-control.service';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AccessContorlService } from '@shared/access-control.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ResponseService,
    PaginateHelper,
    LocalStrategy,
    GenerateTokenService,
    AuthenticateMiddleware,
    AccessContorlService,
  ],
  exports: [AuthService, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
