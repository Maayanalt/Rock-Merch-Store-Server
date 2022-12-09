import { IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from 'class-validator';

export class UsersDto {
  id: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  address: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;

  @IsMobilePhone()
  phone: string | undefined;
}
