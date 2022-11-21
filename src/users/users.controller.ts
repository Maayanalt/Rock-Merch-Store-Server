import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './users-dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/email/:email')
  findCustomerByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get()
  @UseGuards(AuthGuard)
  findOneUser(@Session() session: Record<string, any>) {
    return this.usersService.find(session.userID);
  }

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(
    @Body() userLogin: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const userID = await this.authService.validateUser(
      userLogin.email,
      userLogin.password,
    );
    if (userID) {
      session.userID = userID;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Session() session: Record<string, any>) {
    session.destroy();
  }
}
