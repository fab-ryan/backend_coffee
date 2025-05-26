import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthUser } from '@decorators';
import { AuthGuard, AuthUserType } from '@guards/auth.guard';
import { I18nLang } from 'nestjs-i18n';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@enums/role.enum';

@ApiBearerAuth()
@ApiTags('Carts')
@Roles(Role.ADMIN, Role.GUEST, Role.USER)
@UseGuards(AuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post()
  create(@Body() createCartDto: CreateCartDto, @AuthUser() user: AuthUserType, @I18nLang() lang: string) {
    return this.cartsService.create(createCartDto, user.id, lang);
  }

  @Get()
  findAll(@AuthUser() user: AuthUserType, @I18nLang() lang: string) {
    return this.cartsService.findAll(user.id, lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
