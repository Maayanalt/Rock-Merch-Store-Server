import { Controller, Post, Body } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('email')
  async sendEmail(@Body() forgotPassDto: ForgotPasswordDto) {
    const { email, userID, firstName } = forgotPassDto;
    this.resetPasswordService.sendForgotPasswordEmail(email, userID, firstName);
  }
}
