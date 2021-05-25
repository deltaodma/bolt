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
import { Role } from './../../roles/entities/roles.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  country: string;

  @Column()
  employee_code: string;

  @Column()
  status: number;

  //@Column({ type: 'timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @OneToMany((type) => UserRoles, (userRole) => userRole.user)
  userRoles: UserRoles[];

  @ManyToMany((type) => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  // The following definitions can be achieved
  //   @JoinTable({
  //     name: 'user_role',
  //     joinColumn: { name: 'user_id' },
  //     inverseJoinColumn: { name: 'role_id' },
  //   })
  roles: Role[];
}
