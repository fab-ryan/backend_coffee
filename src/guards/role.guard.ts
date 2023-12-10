import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '@decorators/roles.decorator';
import { Role } from '@enums/role.enum';
import { AccessContorlService } from '@shared/access-control.service';
import { ResponseService } from '@utils';

export class TokenDto {
  id: number;
  role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessContorlService,
    private readonly responseService: ResponseService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: Role.ADMIN,
      });

      if (result) {
        return true;
      }
    }

    throw this.responseService.Response({
      success: false,
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
}
