import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

//import { Language } from '../../../global/entities/languaje.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icono: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

  @Column()
  description_es: string;

  @Column()
  description_en: string;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  deleted_at: Date;
}
