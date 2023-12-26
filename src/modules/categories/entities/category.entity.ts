import { uuid } from '@utils';
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '@modules/products/entities/product.entity';

@Entity('categories')
export class Category {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
