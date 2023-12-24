import {
  Column,
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from '@modules/products/entities/product.entity';
import { uuid } from '@utils';

@Entity('prices')
export class Price {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @Column({ nullable: false })
  size: string;

  @Column('decimal', { nullable: false, precision: 6, scale: 2 })
  price: number;

  @Column({ nullable: false, default: 'USD' })
  currency: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Product, (product) => product.price)
  @JoinColumn()
  product: Product;
}
