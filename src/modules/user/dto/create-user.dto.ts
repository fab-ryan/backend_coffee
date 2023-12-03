import { IsRwandanPhoneNumber, parseToRwandanNumber } from '@common';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the full User',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '@john',
    description: 'The username of the User',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the User',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: '0780000000',
    description: 'The phone number of the User',
  })
  @IsString()
  @IsNotEmpty()
  @parseToRwandanNumber
  @IsRwandanPhoneNumber()
  readonly phone: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: 'true',
    description: 'The status of the User',
  })
  @IsBoolean()
  @IsOptional()
  readonly status: boolean;
}
