import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

declare global {
  interface ExpressRequest extends Request {
    currentUser?: User;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.userService.findOne(userId);

      req.currentUser = user;
    }
    next();
  }
}
