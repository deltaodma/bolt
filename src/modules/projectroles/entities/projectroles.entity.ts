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

import { Role } from './../../roles/entities/roles.entity';
import { Project } from './../../projects/entities/projects.entity';
import { ProjectRoleSubmenu } from 'src/global/entities/projectrolessubmenus.entity';
@Entity('project_roles')
export class ProjectRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rol_id: string;

  @Column()
  project_id: string;

  //@Column({ type: 'timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
  /*
  @OneToOne(() => Role)
  @JoinColumn({ name: 'rol_id' })
  rol: Role;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(
    (type) => ProjectRoleSubmenu,
    (projectRole) => projectRole.project_rol,
  )
  rolesSubmenu: ProjectRoleSubmenu[]; */
}
