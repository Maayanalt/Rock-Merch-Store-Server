import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ValidateEmailMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.email) {
      const validEmail = await this.authService.availableEmail(req.body.email);
      if (!validEmail)
        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
    next();
  }
}
