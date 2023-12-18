import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/db.module';
import { UserModule } from '@modules/user/user.module';
import { I18Module } from '@config/i18.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    I18Module,
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
