import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ResetPasswordService } from 'src/reset-password/reset-password.service';

@Injectable()
export class ResetPasswordMiddleware implements NestMiddleware {
  constructor(private readonly resetPassService: ResetPasswordService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().getTime();
    const hashedToken = this.resetPassService.hashToken(req.body.token);
    const tokenEntity = await this.resetPassService.findOne(hashedToken);
    if (now < tokenEntity?.expiration.getTime()) {
      req.body.userID = tokenEntity.user.id;
      next();
    } else {
      throw new HttpException(
        'Token has expired. Please try again',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
