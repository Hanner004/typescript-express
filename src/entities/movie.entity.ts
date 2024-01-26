import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  title: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  director: string;
  @Column({ nullable: false })
  year: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
