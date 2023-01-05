import { Controller, Post, Body } from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('email')
  async sendEmail(@Body() resetPassDto: ResetPasswordDto) {
    const { email, userID, firstName } = resetPassDto;
    this.resetPasswordService.sendForgotPasswordEmail(email, userID, firstName);
  }
}
