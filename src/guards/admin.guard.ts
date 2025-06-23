import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;

    if (!user) {
      return false; // No user found, deny access
    }

    return user.admin; // Allow access if the user is an admin
  }
}
