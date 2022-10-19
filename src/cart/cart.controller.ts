import { Controller, Get, Param, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }
}
