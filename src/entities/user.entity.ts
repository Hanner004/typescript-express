import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from '../enums';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  lastname: string;
  @Column({ nullable: false })
  @Index('IDX_user_email', {
    unique: true,
    where: `(deleted_at is null)`,
  })
  email: string;
  @Column({ nullable: false, select: false })
  password: string;
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
