import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getWishlist(@Session() session: Record<string, any>) {
    const userID = session.userID;
    return this.wishlistService.findItems(userID);
  }
}
