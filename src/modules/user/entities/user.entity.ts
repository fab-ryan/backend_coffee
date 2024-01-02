import {
  Column,
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { uuid } from '@utils';
import { Role } from '@enums/role.enum';

import { Favorite } from '@modules/favorites/entities/favorite.entity';
@Entity('users')
export class User {
  constructor() {
    this.id = uuid();
  }

  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false, default: Role.USER })
  role: string;
  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite[];
}
