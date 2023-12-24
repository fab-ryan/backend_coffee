import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Repository } from 'typeorm';
import { ResponseService } from '@utils';
import { Price } from './entities/price.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '@modules/products/products.service';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly productService: ProductsService,

    private responseService: ResponseService,
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    try {
      const product = await this.productService.getProductById(
        createPriceDto.product_id,
      );

      const checkPriceExist = await this.priceRepository.findOne({
        where: {
          size: createPriceDto.size,
          product: {
            id: createPriceDto.product_id,
          },
        },
      });
      if (checkPriceExist) {
        return this.responseService.Response({
          statusCode: 400,
          success: false,
          message: 'Price already exist',
        });
      }

      const price = this.priceRepository.create({
        ...createPriceDto,
        product,
      });
      const payload = await this.priceRepository.save(price);

      return this.responseService.Response({
        data: payload,
        statusCode: 201,
        message: 'Price created successfully',
        success: true,
      });
    } catch (error) {
      throw this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async findAll() {
    try {
      const prices = await this.priceRepository.find({
        relations: ['product'],
      });
      return this.responseService.Response({
        data: prices,
        statusCode: 200,
        message: 'Prices fetched successfully',
      });
    } catch (error) {
      throw this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async findOne(id: string) {
    try {
      const price = await this.priceRepository.findOne({
        where: { id },
        relations: ['product'],
      });
      if (!price) {
        return this.responseService.Response({
          message: 'Price not found',
        });
      }
      return this.responseService.Response({
        data: price,
        statusCode: 200,
        message: 'Price fetched successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    try {
      const queryBuilder = this.priceRepository.createQueryBuilder('prices');
      const price = await this.priceRepository.findOne({
        where: { id },
      });
      if (!price) {
        return this.responseService.Response({
          message: 'Price not found',
        });
      }
      await queryBuilder
        .update(Price)
        .set(updatePriceDto)
        .where('id = :id', { id })
        .execute();
      return this.responseService.Response({
        message: 'Price updated successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async remove(id: string) {
    try {
      const price = await this.priceRepository.findOne({
        where: { id },
      });

      if (!price) {
        return this.responseService.Response({
          message: 'Price not found',
        });
      }
      await this.priceRepository
        .createQueryBuilder('prices')
        .softDelete()
        .where('id = :id', { id })
        .execute();

      return this.responseService.Response({
        message: 'Price deleted successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async updateStatus(id: string) {
    try {
      const price = await this.priceRepository.findOne({
        where: { id },
      });
      if (!price) {
        return this.responseService.Response({
          message: 'Price not found',
        });
      }
      price.status = !price.status;
      await this.priceRepository.save(price);
      return this.responseService.Response({
        message: 'Price status updated successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async findByProduct(product_id: string): Promise<Price[]> {
    try {
      const product = await this.productService.getProductById(product_id);
      const prices = await this.priceRepository.find({
        where: { product },
      });
      return prices;
    } catch (error) {
      throw this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }
}
