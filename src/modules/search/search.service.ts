import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ResponseService } from '@utils';

@Injectable()
export class SearchService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly responseService: ResponseService,
  ) {}
  async search(query: string): Promise<any> {
    try {
      if (!query) {
        return this.responseService.Response({
          message: 'Please provide a keyword for the search.',
        });
      }
      const results = await this.entityManager.query(
        `
        SELECT *
        FROM (
          SELECT 'products' as type, p.* FROM product p WHERE p.name ILIKE :keyword
          UNION
          SELECT 'category' as type, c.* FROM category c WHERE c.name ILIKE :keyword
        ) as combined
        ORDER BY type, name;`,
        [`%${query}%`],
      );
      return this.responseService.Response({
        message: 'Search results',
        data: results,
        success: true,
      });
    } catch (error) {
      return this.responseService.Response({
        message: error.message,
      });
    }
  }
}
