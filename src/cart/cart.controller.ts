import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartValidatorPipe } from 'src/pipes/cart-validator.pipe';
import { CartService } from './cart.service';
import { CartDetailsDto } from './dto/cartDetails.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(CartValidatorPipe)
  create(
    @Body() cartDetailsDto: CartDetailsDto,
    @Session() session: Record<string, any>,
  ) {
    const date = new Date();
    return this.cartService.createCartDetails(
      cartDetailsDto,
      session.userID,
      date,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getCart(@Session() session: Record<string, any>) {
    const userID = session.userID;
    const cart = await this.cartService.findOne(userID);
    if (cart) {
      const { id } = cart;
      return this.cartService.findCartDetails(id);
    }
    return [];
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  update(
    @Body() cartDetailsDto: CartDetailsDto,
    @Session() session: Record<string, any>,
  ) {
    const date = new Date();
    return this.cartService.updateCartDetails(
      cartDetailsDto,
      session.userID,
      date,
    );
  }
}
