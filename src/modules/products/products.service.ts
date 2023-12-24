import { Injectable } from '@nestjs/common';
import { CreateProductDto, FilesDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ResponseService } from '@utils';
import { CategoriesService } from '@modules/categories/categories.service';
import path from 'path';
import fs from 'fs';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private responseService: ResponseService,
    private readonly categoryService: CategoriesService,
  ) {}
  async create(createProductDto: CreateProductDto, files: FilesDto) {
    const {
      category_id,
      name,
      description,
      roasted,
      special_ingredient,
      ingredients,
    } = createProductDto;
    const category = await this.categoryService.findByCategory(category_id);
    if (!category) {
      return this.responseService.Response({
        message: 'Category not found',
      });
    }
    const product = this.productsRepository.create({
      name,
      description,
      image_portrait: files.image_portrait[0].filename,
      image_landscape: files.image_landscape[0].filename,
      category,
      roasted,
      special_ingredient,
      ingredients,
    });
    await this.productsRepository.save(product);
    return this.responseService.Response({
      message: 'Product created successfully',
      data: product,
    });
  }

  async findAll() {
    try {
      const products = await this.productsRepository.find({
        relations: ['category'],
      });
      return this.responseService.Response({
        data: products,
        statusCode: 200,
        message: 'Products fetched successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: ['category'],
      });
      if (!product) {
        return this.responseService.Response({
          message: 'Product not found',
        });
      }
      return this.responseService.Response({
        data: product,
        statusCode: 200,
        message: 'Product fetched successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    files?: FilesDto,
  ) {
    try {
      const queryBuilder =
        this.productsRepository.createQueryBuilder('products');
      const product = await this.productsRepository.findOne({
        where: { id },
      });
      if (!product) {
        return this.responseService.Response({
          message: 'Product not found',
        });
      }
      if (files) {
        if (files.image_landscape && files.image_landscape[0]) {
          updateProductDto.image_landscape = files.image_landscape[0].filename;
          const imagePath = path.join(
            __dirname,
            `../../../uploads/${product.image_landscape}`,
          );
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        if (files.image_portrait && files.image_portrait[0]) {
          updateProductDto.image_portrait = files.image_portrait[0].filename;
          const imagePath = path.join(
            __dirname,
            `../../../uploads/${product.image_portrait}`,
          );
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }

      await queryBuilder
        .update(Product)
        .set({
          ...updateProductDto,
          image_portrait: files.image_portrait[0].filename,
          image_landscape: files.image_landscape[0].filename,
        })
        .where('id = :id', { id })
        .execute();
      const updatedProduct = await this.productsRepository.findOne({
        where: { id },
      });
      return this.responseService.Response({
        data: updatedProduct,
        statusCode: 200,
        message: 'Product updated successfully',
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
      const product = await this.productsRepository.findOne({
        where: { id },
      });

      if (!product) {
        return this.responseService.Response({
          message: 'Product not found',
        });
      }
      await this.productsRepository
        .createQueryBuilder('products')
        .softDelete()
        .where('id = :id', { id })
        .execute();

      return this.responseService.Response({
        message: 'Product deleted successfully',
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
      const product = await this.productsRepository.findOne({
        where: { id },
      });
      if (!product) {
        return this.responseService.Response({
          message: 'Product not found',
        });
      }
      product.status = !product.status;
      await this.productsRepository.save(product);
      return this.responseService.Response({
        message: 'Product status updated successfully',
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
        statusCode: error.status,
        success: false,
      });
    }
  }
}
