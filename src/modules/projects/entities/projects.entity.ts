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
  DeleteDateColumn,
  UpdateDateColumn,
  TreeChildren,
} from 'typeorm';

import { Submenu } from './../../submenus/entities/submenu.entity';
import { ProjectRole } from './../../projectroles/entities/projectroles.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icon: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

  @Column()
  description_es: string;

  @Column()
  description_en: string;

  @Column()
  status: number;

  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', select: false })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', select: false })
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany((type) => Submenu, (submenu) => submenu.project)
  submenus: Submenu[];
}
