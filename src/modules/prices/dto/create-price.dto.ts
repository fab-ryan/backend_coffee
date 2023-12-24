import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { Currency } from '@enums/role.enum';

export class CreatePriceDto {
  @ApiProperty({
    name: 'size',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({
    name: 'price',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    name: 'currency',
    type: 'string',
    required: true,
  })
  @IsEnum(Currency)
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({
    name: 'product_id',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  product_id: string;
}
