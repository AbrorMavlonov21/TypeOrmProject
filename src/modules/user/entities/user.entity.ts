import { Role } from 'role/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'full_name' })
  fullname?: string;

  @Column({ type: 'simple-array', nullable: true, default: [Role.User] })
  roles?: string[];
}
