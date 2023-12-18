import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ResponseService } from '@utils';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AccessContorlService } from '@shared/access-control.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ResponseService,
    AuthenticateMiddleware,
    AccessContorlService,
  ],
})
export class ProductsModule {}
