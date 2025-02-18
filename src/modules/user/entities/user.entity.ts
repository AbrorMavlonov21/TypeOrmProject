import { Role } from '../../../role/role.enum';
import { UserDetail } from '../../../modules/user-details/entities/user-detail.entity';
import { UserProduct } from '../../../modules/user-product/entities/user-product.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  @Column({ type: 'simple-array', nullable: true, default: [Role.User] })
  roles?: string[];

  @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
  userProducts: UserProduct[];

  @OneToOne(() => UserDetail, (details) => details.user)
  details: UserDetail;
}
