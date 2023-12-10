import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import config from '@config/config';
export const jwtConfig: JwtModuleAsyncOptions = {
  global: true,
  useFactory: () => ({
    secret: config().jwt_secret,
    signOptions: {
      expiresIn: config().jwt_expires_in,
    },
  }),
};
