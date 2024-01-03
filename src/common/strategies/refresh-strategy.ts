import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@modules/user/user.service';
import { Request as RequestType } from 'express';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(req: RequestType, payload: any) {
    const refreshToken = req.headers.authorization.split(' ')[1];
    const user = await this._userService.findUserByEmail(payload.email);
    if (user.refreshToken !== refreshToken) {
      throw new Error('Invalid token');
    }
    return payload;
  }
}
