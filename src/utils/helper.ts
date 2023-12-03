import { SelectQueryBuilder } from 'typeorm';
import { isIn } from 'class-validator';

export const formatUsername = (name: string) => {
  if (!name) return '';
  return name
    .replace(/' '/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();
};
export interface AssociativeArray {
  [key: string]: string | boolean | number;
}

export const filterQueryBuilderFromRequest = <T>(
  q: SelectQueryBuilder<T>,
  filters?: AssociativeArray,
) => {
  if (filters) {
    const keys = Object.keys(filters);

    const alias = q.alias;

    for (const key of keys) {
      const value = filters[key];

      if (isIn(key, ['limit', 'offset', 'page'])) continue;

      if (key === 'from') {
        q.andWhere(`${alias}.createdAt >= '${value}'`);
        continue;
      }
      if (key === 'to') {
        q.andWhere(`${alias}.createdAt <= '${value}'`);

        continue;
      }

      if (typeof value === 'string') {
        q.andWhere(
          `LOWER(${alias}.${key})  LIKE  '${value.toLocaleLowerCase()}%' `,
        );
      } else if (typeof value === 'number') {
        q.andWhere(`${alias}.${key} = ${value} `);
      } else if (typeof value === 'boolean') {
        q.andWhere(`${alias}.${key} = ${value}`);
      }
    }
  }
};

export const url = (link: string) => {
  const base = process.env.BACKEND_DOMAIN + '/' + process.env.PREFIX;

  if (link.charAt(0) == '/') {
    return base + link;
  }
  return base + '/' + link;
};
