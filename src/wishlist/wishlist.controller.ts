import {
  Controller,
  Get,
  Session,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
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

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() itemId: { value: number },
    @Session() session: Record<string, any>,
  ) {
    const userId = session.userID;
    return this.wishlistService.create({ userId, itemId: itemId.value });
  }
}
