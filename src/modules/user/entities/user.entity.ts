import {
  Column,
  PrimaryColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { uuid } from '@utils';
import { Role } from '@enums/role.enum';

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

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false, default: Role.USER })
  role: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
