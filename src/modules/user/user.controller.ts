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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: [CreateUserDto],
    schema: {
      example: {},
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: [CreateUserDto],
    schema: {
      example: {},
    },
  })
  findAll(
    @I18nLang() lang: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: CreateUserDto,
    schema: {
      example: {},
    },
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: CreateUserDto,
    schema: {
      example: {},
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
