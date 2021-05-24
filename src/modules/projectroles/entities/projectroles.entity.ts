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

@Entity('project_roles')
export class ProjectRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

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

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  rol: Role;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
