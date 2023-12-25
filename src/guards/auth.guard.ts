import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticateMiddleware } from '@middlewares/authenticate.middleware';
import { ResponseService } from '@utils';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AccessContorlService } from '@shared/access-control.service';
import { Role } from '@enums/role.enum';
import { ROLE_KEY } from '@decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authMiddleware: AuthenticateMiddleware,
    private readonly responseServices: ResponseService,
    private reflector: Reflector,
    private accessControlService: AccessContorlService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let userRole: Role;
    for (const role of requiredRoles) {
      userRole = this.accessControlService.getRole({
        requiredRole: role,
        currentRole: Role.ADMIN,
      });
    }
    const request = context.switchToHttp().getRequest<Request>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await this.authMiddleware.use(request, null, () => {});

    const user = request.user as AuthUserType;
    if (user.role === userRole) {
      return true;
    }
    throw this.responseServices.Response({
      success: false,
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
}

export interface AuthUserType {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: boolean;
  iat: number;
  exp: number;
}
