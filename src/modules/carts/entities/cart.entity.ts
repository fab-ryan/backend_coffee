import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '@modules/products/entities/product.entity';
import { uuid } from '@utils';

@Entity()
export class Cart {
    constructor() {
        this.id = uuid();
    }
    @PrimaryColumn('uuid', { name: 'id' })
    id: string;

    @Column({ nullable: false, default: 0 })
    quantity: number;

    @Column({ nullable: false, default: false })
    is_checked_out: boolean;

    @Column({ type: 'timestamp', nullable: false })
    created_at: Date;
    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @OneToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @OneToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
