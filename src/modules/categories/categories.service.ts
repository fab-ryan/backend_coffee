import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ResponseService } from '@utils';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@generated/i18n.generated';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private responseService: ResponseService,
    private i18n: I18nService<I18nTranslations>,
  ) {}
  async createCategory(createCotegoryDto: CreateCategoryDto) {
    try {
      const { name } = createCotegoryDto;
      const checkCategory = await this.categoryRepository.findOne({
        where: { name: name },
      });
      if (checkCategory) {
        throw this.responseService.Response({
          statusCode: 400,
          success: false,
          message: this.i18n.translate('response.CATEGORY_EXIST'),
        });
      }

      const category = this.categoryRepository.create(createCotegoryDto);
      const payload = await this.categoryRepository.save(category);

      return this.responseService.Response({
        data: payload,
        statusCode: 201,
        message: this.i18n.translate('response.CATEGORY_CREATE'),
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
      const categories = await this.categoryRepository.find();
      return this.responseService.Response({
        data: categories,
        statusCode: 200,
        message: this.i18n.translate('response.CATEGORY_DETAILS'),
      });
    } catch (error) {
      throw this.responseService.Response({
        statusCode: error.status,
        message: error.message,
        success: false,
      });
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!category) {
        return this.responseService.Response({
          message: this.i18n.translate('response.CATEGORY_NOT_FOUND'),
          statusCode: 400,
          success: false,
        });
      }

      return this.responseService.Response({
        data: category,
        statusCode: 200,
        message: this.i18n.translate('response.CATEGORY_DETAILS'),
        success: false,
      });
    } catch (err) {
      throw this.responseService.Response({
        message: err.message,
        statusCode: err.status,
        success: false,
      });
    }
  }

  async update(id: string, updateCotegoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw this.responseService.Response({
          statusCode: 404,
          success: false,
          message: this.i18n.translate('response.CATEGORY_NOT_FOUND'),
        });
      }
      await this.categoryRepository
        .createQueryBuilder()
        .update(category)
        .set(updateCotegoryDto)
        .where('id = :id', { id: id })
        .execute();

      const categoryAfter = await this.categoryRepository.findOne({
        where: { id },
      });

      return this.responseService.Response({
        data: categoryAfter,
        message: this.i18n.t('response.CATEGORY_UPDATE'),
        statusCode: 200,
        success: true,
      });
    } catch (err) {
      throw this.responseService.Response({
        message: err.message,
        success: false,
        statusCode: err.status,
      });
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw this.responseService.Response({
          message: this.i18n.t('response.CATEGORY_NOT_FOUND'),
          statusCode: 404,
          success: false,
        });
      }
      await this.categoryRepository
        .createQueryBuilder('categories')
        .softDelete()
        .where('id = :id', { id })
        .execute();
      return this.responseService.Response({
        message: this.i18n.t('response.CATEGORY_DELETE'),
        statusCode: 200,
        success: true,
      });
    } catch (err) {
      throw this.responseService.Response({
        message: this.i18n.t('response.CATEGORY_NOT_FOUND'),
        statusCode: err.statusCode,
        success: false,
      });
    }
  }

  async findByCategory(category_id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: category_id },
      });
      if (!category) {
        throw this.responseService.Response({
          message: this.i18n.t('response.CATEGORY_NOT_FOUND'),
          statusCode: 404,
          success: false,
        });
      }
      return category;
    } catch (err) {
      throw this.responseService.Response({
        message: this.i18n.t('response.CATEGORY_NOT_FOUND'),
        statusCode: err.statusCode,
        success: false,
      });
    }
  }
}
