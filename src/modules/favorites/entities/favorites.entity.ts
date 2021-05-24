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

import { User } from './../../user/entities/user.entity';
import { App } from './../../apps/entities/apps.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  app_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at?: Date;

  @Column({ name: 'updated_at' })
  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @Column({ name: 'last_access' })
  @UpdateDateColumn()
  last_access?: Date;

  @OneToOne(() => App)
  @JoinColumn({ name: 'app_id' })
  app: App;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
