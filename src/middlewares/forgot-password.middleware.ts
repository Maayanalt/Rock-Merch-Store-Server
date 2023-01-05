import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ForgotPasswordMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.usersService.findByEmail(req.body.email);
    if (user) {
      req.body.userID = user.id;
      req.body.firstName = user.firstName;
      next();
    }
  }
}
