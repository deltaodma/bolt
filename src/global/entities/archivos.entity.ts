import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Banner } from '../../modules/banners/entities/banner.entity';

@Entity('files')
export class Archivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  relative_path: string;

  @Column()
  full_path: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
  @Column({ type: 'timestamp' })
  updated_at: Date;
  @Column({ type: 'timestamp' })
  deleted_at: Date;
}
