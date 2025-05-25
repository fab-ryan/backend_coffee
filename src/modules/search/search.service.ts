import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ResponseService } from '@utils';

@Injectable()
export class SearchService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly responseService: ResponseService,
  ) { }
  async search(query: string): Promise<any> {
    try {
      if (!query) {
        return this.responseService.Response({
          message: 'Please provide a keyword for the search.',
        });
      }
      const resultsProducts = await this.entityManager.query(
        `
        SELECT * FROM products WHERE name ILIKE $1 OR roasted ILIKE $1 OR description ILIKE $1
        `,
        [`%${query}%`],
      );

      const resultsCategories = await this.entityManager.query(
        `
        SELECT * FROM categories WHERE name ILIKE $1 OR description ILIKE $1
        `,
        [`%${query}%`],
      );
      const results = [...resultsProducts, ...resultsCategories];
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
