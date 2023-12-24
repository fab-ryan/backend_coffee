import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: 'string', required: true, title: 'Product Name' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', required: true, title: 'Product Description' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', required: true, title: 'Product roasted' })
  @IsString()
  roasted: string;

  @ApiProperty({ type: 'string', required: true, title: 'Product ingredients' })
  @IsString()
  ingredients: string;

  @ApiProperty({
    type: 'string',
    required: true,
    title: 'Product special ingredient',
  })
  @IsString()
  special_ingredient: string;

  @ApiProperty({ type: 'string', required: true, title: 'Product Category' })
  @IsString()
  category_id: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    title: 'Product Landscape image',
  })
  image_landscape: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    title: 'Product portaits image',
  })
  image_portrait: Express.Multer.File;
}

export class FilesDto {
  image_landscape: Express.Multer.File;

  image_portrait: Express.Multer.File;
}
