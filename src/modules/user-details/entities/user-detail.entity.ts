import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users_details')
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    name: 'full_name',
    unique: true,
  })
  fullname: string;

  @Column({ type: 'integer', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 128, nullable: false })
  gender: string;

  @Column({ unique: true })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.details)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
