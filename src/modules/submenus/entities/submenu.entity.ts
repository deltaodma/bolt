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

@Entity('submenus')
export class Submenu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  project_id: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  //@Column({ type: 'timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  user_created: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  user_update: User;
}
