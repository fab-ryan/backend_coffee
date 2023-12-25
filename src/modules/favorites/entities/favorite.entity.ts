import {
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { uuid } from '@utils';
import { Product } from '@modules/products/entities/product.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity('favorities')
export class Favorite {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Product, (product) => product.favorite)
  @JoinTable()
  product: Product;

  @ManyToOne(() => User, (user) => user.favorite)
  @JoinTable()
  user: User;
}
