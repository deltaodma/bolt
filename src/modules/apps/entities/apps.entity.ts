import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Submenu } from './../../submenus/entities/submenu.entity';
import { Type } from './../../types/entities/types.entity';
import { User } from './../../user/entities/user.entity';

@Entity('apps')
export class App {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type_id: string;

  @Column()
  url: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

  @Column()
  submenu_id: string;

  @Column()
  status: number;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @Column({
    type: 'timestamp',
  })
  //@CreateDateColumn()
  created_at: Date | string;

  @Column({
    type: 'timestamp',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', select: false })
  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @OneToOne(() => Submenu)
  @JoinColumn({ name: 'submenu_id' })
  xax: Submenu;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  user_created?: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  user_update?: User;

  @ManyToOne((type) => Submenu, (role) => role.apps, { primary: true })
  @JoinColumn({ name: 'submenu_id' })
  submenu: Submenu;
}
