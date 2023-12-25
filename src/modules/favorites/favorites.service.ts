import { Injectable } from '@nestjs/common';
import { ResponseService } from '@utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { UserService } from '@modules/user/user.service';
import { ProductsService } from '@modules/products/products.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly responseService: ResponseService,
    private readonly userService: UserService,
    private readonly productsService: ProductsService,
  ) {}

  async addFavorites(product_id: string, user_id: string) {
    try {
      const user = await this.userService.getUserByEmailOrById(null, user_id);
      const product = await this.productsService.getProductById(product_id);
      const queryBuilder =
        this.favoriteRepository.createQueryBuilder('favorites');

      const checkFavorite = await queryBuilder
        .andWhere((queryBuilder) => {
          queryBuilder
            .leftJoinAndSelect('favorites.user', 'user')
            .leftJoinAndSelect('favorites.product', 'product')
            .select(['favorites.id', 'user.id'])
            .where('user.id = :user_id', { user_id: user.id })
            .andWhere('product.id = :product_id', {
              product_id: product.id,
            });
        })
        .getOne();

      if (checkFavorite) {
        throw this.responseService.Response({
          message: 'Product already added to favorites',
          statusCode: 400,
          success: false,
        });
      }

      const favorite = this.favoriteRepository.create({
        user,
        product,
      });
      const payload = await this.favoriteRepository.save(favorite);
      return this.responseService.Response({
        data: payload,
        statusCode: 201,
        message: 'Product added to favorites',
        success: true,
      });
    } catch (e) {
      throw this.responseService.Response({
        message: e.message,
        statusCode: e.status,
        success: false,
      });
    }
  }

  async removeFavorites(product_id?: string, user_id?: string) {
    try {
      const user = await this.userService.getUserByEmailOrById(null, user_id);
      const product = await this.productsService.getProductById(product_id);
      const queryBuilder =
        this.favoriteRepository.createQueryBuilder('favorites');

      const checkFavorite = await queryBuilder
        .andWhere((queryBuilder) => {
          queryBuilder
            .leftJoinAndSelect('favorites.user', 'user')
            .leftJoinAndSelect('favorites.product', 'product')
            .where('user.id = :user_id', { user_id: user.id })
            .andWhere('product.id = :product_id', {
              product_id: product.id,
            });
        })
        .getOne();

      if (!checkFavorite) {
        throw this.responseService.Response({
          message: 'Product not found in favorites',
          statusCode: 400,
          success: false,
        });
      }

      await this.favoriteRepository.delete(checkFavorite.id);
      return this.responseService.Response({
        statusCode: 200,
        message: 'Product removed from favorites',
        success: true,
      });
    } catch (e) {
      throw this.responseService.Response({
        message: e.message,
        statusCode: e.status,
        success: false,
      });
    }
  }

  async getAllFavorites(user_id: string) {
    try {
      const user = await this.userService.getUserByEmailOrById(null, user_id);
      const queryBuilder =
        this.favoriteRepository.createQueryBuilder('favorites');

      const favorites = await queryBuilder
        .leftJoinAndSelect('favorites.product', 'product')
        .leftJoinAndSelect('favorites.user', 'user') // Adjust this line
        .where('user.id = :user_id', { user_id: user.id })
        .select(['favorites.id', 'product', 'user.name', 'user.id'])
        .getMany();

      return this.responseService.Response({
        data: favorites,
        statusCode: 200,
        message: 'Favorites list',
        success: true,
      });
    } catch (e) {
      throw this.responseService.Response({
        message: e.message,
        statusCode: e.status,
        success: false,
      });
    }
  }
}
