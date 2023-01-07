import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetPassword } from './entities/reset-password.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(ResetPassword)
    private resetPasswordRepository: Repository<ResetPassword>,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendForgotPasswordEmail(
    email: string,
    userID: number,
    firstName: string,
  ) {
    const tokens = await this.resetPasswordRepository.find({
      user: { id: userID },
    });
    if (tokens)
      await this.resetPasswordRepository.delete({ user: { id: userID } });

    const buf = crypto.randomBytes(48);
    const token = buf.toString('hex');
    const origin = this.configService.get('CORS_ORIGIN');
    const url = `${origin}/reset-password?token=${token}`;
    await this.saveTokenToDB(token, userID);

    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('MAIL_FROM'),
        subject: 'Reset your password',
        template: './reset-password',
        context: {
          name: firstName,
          url,
          homePage: origin,
        },
      })
      .catch((err) => console.log(err));
  }

  hashToken(token: string) {
    return CryptoJS.HmacSHA256(
      token,
      this.configService.get('SECRET'),
    ).toString();
  }

  async saveTokenToDB(token: string, userID: number) {
    const hashedToken = this.hashToken(token);
    const expiration = new Date(new Date().getTime() + 60 * 60 * 1000); //token expires after one hour
    const resetEntity = this.resetPasswordRepository.create({
      token: hashedToken,
      expiration,
      user: { id: userID },
    });
    await this.resetPasswordRepository.save(resetEntity);
  }
}
