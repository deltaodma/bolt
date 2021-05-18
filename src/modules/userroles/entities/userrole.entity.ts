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
import { Role } from './../../roles/entities/roles.entity';
import { User } from './../../user/entities/user.entity';

@Entity('user_roles')
export class UserRoles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  role_id: string;

  //@Column({ type: 'timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @ManyToOne((type) => User, (user) => user.userRoles, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Role, (role) => role.userRoles, { primary: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
