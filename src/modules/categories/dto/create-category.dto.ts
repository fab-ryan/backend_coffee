import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Beans',
    description: 'The name of the cotegory',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'Beans',
    description: 'The description of the cotegory',
  })
  @IsString()
  @IsOptional()
  readonly description: string;
}
