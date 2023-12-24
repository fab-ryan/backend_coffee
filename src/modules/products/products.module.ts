import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PaginateHelper, ResponseService } from '@utils';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AccessContorlService } from '@shared/access-control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from '@modules/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ResponseService,
    AuthenticateMiddleware,
    AccessContorlService,
    PaginateHelper,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
