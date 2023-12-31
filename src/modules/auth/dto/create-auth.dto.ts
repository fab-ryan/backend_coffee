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

export interface GenerateToken {
  email: string;
  name: string;
  id: string;
  phone: string;
  status: boolean;
  role: string;
}
