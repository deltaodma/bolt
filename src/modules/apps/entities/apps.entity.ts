import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

import { Submenu } from './../../submenus/entities/submenu.entity';
import { Type } from './../../types/entities/types.entity';

@Entity('apps')
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type_id: string;

  @Column()
  url: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

  @Column()
  submenu_id: string;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  deleted_at: Date;

  @OneToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToOne(() => Submenu)
  @JoinColumn({ name: 'submenu_id' })
  submenu: Submenu;
}
