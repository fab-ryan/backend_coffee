import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { AccessContorlService } from '@shared/access-control.service';
import { ResponseService } from '@utils';

@Module({
  controllers: [SearchController],
  providers: [
    SearchService,
    ResponseService,
    AuthenticateMiddleware,
    AccessContorlService,
  ],
})
export class SearchModule {}
