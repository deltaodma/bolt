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
} from 'typeorm';

//import { Language } from '../../../global/entities/languaje.entity';
import { UserRoles } from './../../userroles/entities/userrole.entity';
import { User } from './../../user/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

  @Column()
  description_en: string;

  @Column()
  description_es: string;

  @Column()
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @OneToMany((type) => UserRoles, (userRole) => userRole.role)
  userRoles: UserRoles[];

  @ManyToMany((type) => User, (user) => user.roles, { cascade: true })
  users: User[];
}
