import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    const user = request.user;
    

    if (!user || !user.roles) {
      return false;
    }

    const userRoles = user.roles.split(',');

    const hasRequiredRole = roles.some((role) => userRoles.includes(role));

    return hasRequiredRole;
  }
}
