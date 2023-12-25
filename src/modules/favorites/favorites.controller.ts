import { Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@enums/role.enum';
import { AuthGuard, AuthUserType } from '@guards/auth.guard';
import { AuthUser } from '@decorators';

@ApiBearerAuth()
@ApiTags('Favorites')
@Roles(Role.ADMIN, Role.GUEST, Role.USER)
@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':product_id')
  addFavorites(
    @AuthUser() user: AuthUserType,
    @Param('product_id') product_id: string,
  ) {
    return this.favoritesService.addFavorites(product_id, user.id);
  }

  @Post('/remove/:product_id')
  removeFavorites(
    @AuthUser() user: AuthUserType,
    @Param('product_id') product_id: string,
  ) {
    return this.favoritesService.removeFavorites(product_id, user.id);
  }

  @Get()
  getAllFavorites(@AuthUser() user: AuthUserType) {
    return this.favoritesService.getAllFavorites(user.id);
  }
}
