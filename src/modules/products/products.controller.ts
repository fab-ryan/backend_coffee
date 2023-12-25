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
  Version,
  UploadedFiles,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@enums/role.enum';
import { AuthGuard, AuthUserType } from '@guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AssociativeArray, storage } from '@utils';
import { Express } from 'express';
import { AuthUser } from '@decorators';

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'image_portrait',
          maxCount: 1,
        },
        {
          name: 'image_landscape',
          maxCount: 1,
        },
      ],
      { storage },
    ),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files: {
      image_portrait: Express.Multer.File;
      image_landscape: Express.Multer.File;
    },
  ) {
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  findAll(
    @AuthUser() user: AuthUserType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() filters: AssociativeArray,
  ) {
    return this.productsService.findAll(user.id, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'image_portrait',
          maxCount: 1,
        },
        {
          name: 'image_landscape',
          maxCount: 1,
        },
      ],
      { storage },
    ),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles()
    files: {
      image_portrait: Express.Multer.File;
      image_landscape: Express.Multer.File;
    },
  ) {
    return this.productsService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Patch('status/:id')
  updateStatus(@Param('id') id: string) {
    return this.productsService.updateStatus(id);
  }
}
