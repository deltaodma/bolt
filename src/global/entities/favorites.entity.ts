import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Banner } from '../../modules/banners/entities/banner.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parent_id: string;

  @Column()
  lang: string;

  @Column()
  property: string;

  @Column()
  value: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
  @Column({ type: 'timestamp' })
  updated_at: Date;
  @Column({ type: 'timestamp' })
  deleted_at: Date;

  @ManyToOne(() => Banner, (banner) => banner.lang)
  @JoinColumn({ name: 'parent_id' })
  banners: Banner;
}
