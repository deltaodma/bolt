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
} from 'typeorm';

import { Language } from './../../../global/entities/languaje.entity';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  url_redirect: string;

  @Column()
  pdf: string;

  @Column()
  button_es: string;

  @Column()
  button_en: string;

  @Column()
  content_es: string;

  @Column()
  content_en: string;

  @Column({ type: 'timestamp', select: false })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', select: false })
  @CreateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', select: false })
  @CreateDateColumn()
  deleted_at: Date;

  @OneToMany(() => Language, (language) => language.banners)
  @JoinColumn({ name: 'id' })
  lang: Language[];
}
