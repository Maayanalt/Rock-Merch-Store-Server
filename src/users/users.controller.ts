import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateDto } from './dto/updateUser.dto';

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

  @Patch('update')
  @UseGuards(AuthGuard)
  async update(
    @Body() userUpdateDto: UpdateDto,
    @Session() session: Record<string, any>,
  ) {
    if (!(await this.usersService.update(userUpdateDto, session.userID)))
      throw new BadRequestException('Email already exist');
  }
}
