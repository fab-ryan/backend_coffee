import { Global, Module } from '@nestjs/common';
import { ResponseService } from '@utils';
import { AccessContorlService } from './access-control.service';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [ResponseService, AccessContorlService, AuthenticateMiddleware],
    exports: [ResponseService, AccessContorlService, AuthenticateMiddleware],
})
export class SharedModule { }