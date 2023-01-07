import { Controller, Post, Body } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('email')
  async sendEmail(@Body() forgotPassDto: ForgotPasswordDto) {
    const { email, userID, firstName } = forgotPassDto;
    this.resetPasswordService.sendForgotPasswordEmail(email, userID, firstName);
  }

  @Post()
  async resetPassword(@Body() resetPassDto: ResetPasswordDto) {
    const { password, userID } = resetPassDto;
    this.resetPasswordService.resetPassword(password, userID);
  }
}
