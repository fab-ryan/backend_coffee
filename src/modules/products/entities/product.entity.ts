import {
  Column,
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { uuid } from '@utils';
import { Category } from '@modules/categories/entities/category.entity';

@Entity('products')
export class Product {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column({ nullable: false })
  roasted: string;

  @Column({ nullable: false })
  ingredients: string;

  @Column({ nullable: false })
  special_ingredient: string;

  @Column({ nullable: false })
  image_landscape: string;

  @Column({ nullable: false })
  image_portrait: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn()
  category: Category;
}
