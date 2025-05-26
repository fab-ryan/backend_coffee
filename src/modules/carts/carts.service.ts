import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Product } from '@modules/products/entities/product.entity';
import { ResponseService } from '@utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly responseService: ResponseService,
    private readonly i18n: I18nService<I18nTranslations>,

  ) { }
  async create(createCartDto: CreateCartDto, user_id: string, lang: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: user_id } });
      const product = await this.productRepository.findOne({ where: { id: createCartDto.product_id }, withDeleted: true });
      if (!user || !product) {
        return this.responseService.Response({
          message: this.i18n.translate('response.CART_NOT_FOUND', { lang: 'en' }),
          data: null,
          statusCode: 404,
        })
      }
      const cart = this.cartRepository.create({
        user: user,
        product: product,
        quantity: createCartDto.quantity,
        is_checked_out: false,
        created_at: new Date(),
        updated_at: new Date(),
      });
      await this.cartRepository.save(cart);
      return this.responseService.Response({
        message: this.i18n.translate('response.CART_CREATED', { lang: 'en' }),
        data: cart,
        statusCode: 201,
      })
    } catch (error) {
      const message = (error as Error).message;
      return this.responseService.Response({
        message: message,
        data: null,
        statusCode: 500,
      })
    }
  }

  async findAll(user_id: string, lang: string) {
    try {

      const carts = await this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .where('cart.user.id = :user_id', { user_id: user_id })
        .getMany();
      return this.responseService.Response({
        message: this.i18n.translate('response.CART_LIST', { lang }),
        data: carts,
        statusCode: 200,
      })
    } catch (error) {
      const message = (error as Error).message;
      return this.responseService.Response({
        message: message,
        data: null,
        statusCode: 500,
      })
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
