import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateUserDetailDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  userId: number;
}
