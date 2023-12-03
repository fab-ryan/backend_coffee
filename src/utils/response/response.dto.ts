import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  @ApiProperty({ required: true, readOnly: true })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  statusCode: HttpStatus;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  message: string;

  @ApiProperty({ required: true })
  data: any | object;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  path: any;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  method: string;

  @ApiProperty({ required: false })
  requestId?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  timestamp: number;
}
