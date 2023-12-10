import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I18nLang } from 'nestjs-i18n';
import { AssociativeArray } from '@utils';

import { Role } from '@enums/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { AuthGuard } from '@guards/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@I18nLang() lang: string, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, lang);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  findAll(
    @I18nLang() lang: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query() filters: AssociativeArray,
  ) {
    return this.userService.findAll(filters, lang);
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
