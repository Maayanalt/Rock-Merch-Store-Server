import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @MinLength(10)
  address: string;

  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsNotEmpty()
  @MinLength(5)
  postalCode: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  totalCost: number;

  @IsNotEmpty()
  phone: string;
}
