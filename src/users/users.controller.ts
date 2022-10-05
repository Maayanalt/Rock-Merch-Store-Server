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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './users-dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { CartService } from 'src/cart/cart.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly cartService: CartService,
  ) {}

  @Get('/email/:email')
  findCustomerByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('cart')
  async getCart(@Session() session: Record<string, any>) {
    const userID = session.userID;
    const { id } = await this.usersService.getCart(userID);
    return this.cartService.findCartDetails(id);
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
