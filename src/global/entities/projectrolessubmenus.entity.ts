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

@Entity('roles_submenus')
export class ProjectRoleSubmenu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectrol_id: string;

  @Column()
  submenu_id: string;

  @Column()
  access: number;

  //@Column({ type: 'timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  /*@ManyToOne(() => ProjectRole)
  @JoinColumn({ name: 'projectrol_id' })
  project_rol: ProjectRole;

  @ManyToOne(() => Submenu)
  @JoinColumn({ name: 'project_id' })
  project: Submenu;

  @ManyToOne((type) => Submenu, (user) => user.submenuRoles, { primary: true })
  @JoinColumn({ name: 'user_id' })
  submenu: Submenu; */
}
