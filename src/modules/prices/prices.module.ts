import { Module, forwardRef } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { ResponseService } from '@utils';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AccessContorlService } from '@shared/access-control.service';
import { Price } from './entities/price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '@modules/products/products.module';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    TypeOrmModule.forFeature([Price]),
  ],
  controllers: [PricesController],
  providers: [
    PricesService,
    ResponseService,
    AuthenticateMiddleware,
    AccessContorlService,
  ],
})
export class PricesModule {}
