import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ValidatePasswordMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.password) {
      const validPassword = await this.authService.validatePassword(
        req.body.password,
        req.session.userID,
      );
      if (!validPassword)
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
