import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  lastname: string;
  @Column({ nullable: false })
  email: string;
}
