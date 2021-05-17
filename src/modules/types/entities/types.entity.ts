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

@Entity('types')
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_en: string;

  @Column()
  name_es: string;

  @Column()
  icono: string;

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
