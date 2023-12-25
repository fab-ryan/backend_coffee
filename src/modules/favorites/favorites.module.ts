import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ResponseService } from '@utils';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AccessContorlService } from '@shared/access-control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UserModule } from '@modules/user/user.module';
import { ProductsModule } from '@modules/products/products.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ProductsModule),
    TypeOrmModule.forFeature([Favorite]),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ResponseService,
    AuthenticateMiddleware,
    AccessContorlService,
  ],
})
export class FavoritesModule {}
