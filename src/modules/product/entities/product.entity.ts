import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { UserProduct } from 'src/modules/user-product/entities/user-product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @OneToMany(() => UserProduct, (userProduct) => userProduct.product)
  userProducts: UserProduct[];

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
