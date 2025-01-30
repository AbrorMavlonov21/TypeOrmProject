// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  // @ApiProperty({
  //   type: String,
  //   description: 'User Login ',
  // })
  login: string;

  @IsString()
  @IsNotEmpty()
  // @ApiProperty({
  //   type: String,
  //   description: 'User Password ',
  // })
  password: string;
}
