import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { ResponseService } from '@utils';
import { AccessContorlService } from '@shared/access-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    AuthenticateMiddleware,
    ResponseService,
    AccessContorlService,
  ],
})
export class CategoriesModule {}
