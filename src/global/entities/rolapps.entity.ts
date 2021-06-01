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
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

import { Submenu } from './../../modules/submenus/entities/submenu.entity';
import { ProjectRole } from './../../modules/projectroles/entities/projectroles.entity';

@Entity('roles_apps')
export class RolApps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  app_id: string;

  @Column()
  submenu_role_id: string;
}
