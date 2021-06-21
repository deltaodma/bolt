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

import { User } from './../../user/entities/user.entity';
import { Project } from './../../projects/entities/projects.entity';
import { App } from './../../apps/entities/apps.entity';
import { ProjectRolSubmenu } from 'src/global/entities/projectrolessubmenus.entity';

@Entity('submenus')
export class Submenu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

  @Column()
  description_es: string;

  @Column()
  description_en: string;

  @Column()
  project_id: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @Column()
  status: number;

  //@Column({ type: 'timestamp' })
  @Column({ type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  user_created?: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  user_update?: User;

  @ManyToOne((type) => Project, (role) => role.submenus, { primary: true })
  @JoinColumn({ name: 'project_id' })
  project: Submenu;

  @OneToMany((type) => App, (apps) => apps.submenu)
  apps: App[];

  /*
  @OneToMany((type) => ProjectRolSubmenu, (userRole) => userRole.submenu)
  submenuRoles: ProjectRolSubmenu[]; */
}
