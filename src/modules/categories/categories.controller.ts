import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { I18nLang } from 'nestjs-i18n';
import { AssociativeArray } from '@utils';

import { Role } from '@enums/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { AuthGuard } from '@guards/auth.guard';

@Controller('categories')
@ApiTags('Categories')
@ApiBearerAuth()
@Roles(Role.ADMIN)
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly cotegoriesService: CategoriesService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateCategoryDto,
  })
  @Post()
  create(@Body() createCotegoryDto: CreateCategoryDto) {
    return this.cotegoriesService.createCategory(createCotegoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [CreateCategoryDto],
  })
  @Get()
  findAll() {
    return this.cotegoriesService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateCategoryDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cotegoriesService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateCategoryDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCotegoryDto: UpdateCategoryDto,
  ) {
    return this.cotegoriesService.update(id, updateCotegoryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateCategoryDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cotegoriesService.remove(id);
  }
}
