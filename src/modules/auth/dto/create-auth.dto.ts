import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'john@doe.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;
}
export class GeneratePassword {
  @IsString()
  password: string;
}
