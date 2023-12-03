import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/db.module';
import { UserModule } from '@modules/user/user.module';
import { I18Module } from '@config/i18.module';

@Module({
  imports: [DatabaseModule, UserModule, I18Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
