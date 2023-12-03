import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  Pagination,
  paginate,
  PaginationTypeEnum,
} from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { url } from './helper';

@Injectable({ scope: Scope.REQUEST })
export class PaginateHelper<T> {
  private limit = 10;
  private page = 1;

  constructor(@Inject(REQUEST) private readonly req: Request) {
    try {
      const iurl = new URL(url(req.url));
      this.limit = +iurl.searchParams.get('limit') || 10;
      this.page = +iurl.searchParams.get('page') || 1;
    } catch (error) {}
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  getLimit() {
    return this.limit;
  }

  setPage(page: number) {
    this.page = page;
  }

  getPage() {
    return this.page;
  }

  async run(query: SelectQueryBuilder<T>): Promise<Pagination<T>> {
    return paginate<T>(query, {
      limit: this.limit,
      page: this.page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
    });
  }
}
