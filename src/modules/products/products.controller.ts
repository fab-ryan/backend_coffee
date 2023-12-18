import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Version,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@enums/role.enum';
import { AuthGuard } from '@guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileRequestFilter } from '@filters';
// import { uploadImage } from '@utils';
import { Express } from 'express';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Version('1')
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_landscape'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(new FileRequestFilter('product'))
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
