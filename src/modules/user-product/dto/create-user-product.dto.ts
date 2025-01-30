import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateUserProductDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
