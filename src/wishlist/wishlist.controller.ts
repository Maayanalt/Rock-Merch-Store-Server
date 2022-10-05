import { Controller, Get, Session } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  async getWishlist(@Session() session: Record<string, any>) {
    const userID = session.userID;
    return this.wishlistService.findItems(userID);
  }
}
