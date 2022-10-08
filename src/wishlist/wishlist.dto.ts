import { IsNumber } from 'class-validator';

export class WishlistDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  itemId: number;
}
