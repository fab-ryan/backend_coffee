import { SelectQueryBuilder } from 'typeorm';
import { isIn } from 'class-validator';
import mutler, { diskStorage } from 'multer';
import { extname } from 'path';
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

export const genereteSlug = (name: string) => {
  return name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

const getFileName = (file: Express.Multer.File) => {
  const name = file.originalname.split('.')[0];
  const ext = file.originalname.split('.')[1];
  return `${name}-${Date.now()}.${ext}`;
};

export const storage = diskStorage({
  destination: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    if (file.size > 1024 * 1024 * 5) {
      return cb(new Error('File is too large'), null);
    } else if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), null);
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, getFileName(file));
  },
});
