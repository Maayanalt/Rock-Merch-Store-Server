import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Session,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, UsersDto } from './users-dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

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

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() userLogin: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    console.log('route');
    const userID = await this.authService.validateUser(
      userLogin.email,
      userLogin.password,
    );
    if (userID) {
      session.userID = userID;
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get(':id')
  findCustomer(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ) {
    return this.usersService.find(id);
  }
}
