import { IsRwandanPhoneNumber, parseToRwandanNumber } from '@common';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the full User',
  })
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.IS_NOT_EMPTY',
      { name: 'name' },
    ),
  })
  name: string;

  @ApiProperty({
    example: '@john',
    description: 'The username of the User',
  })
  @IsOptional()
  username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the User',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '0780000000',
    description: 'The phone number of the User',
  })
  @IsString()
  @IsNotEmpty()
  @parseToRwandanNumber
  @IsRwandanPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'true',
    description: 'The status of the User',
  })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty({
    name: 'role',
    example: 'USER',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
