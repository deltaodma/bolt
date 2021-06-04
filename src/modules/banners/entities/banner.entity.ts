import { Archivo } from './../../../global/entities/archivos.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Language } from './../../../global/entities/languaje.entity';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name_es: string;

  @Column()
  name_en: string;

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

  @Column()
  status: number;

  @Column({ type: 'timestamp', select: false })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', select: false })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', select: false })
  @DeleteDateColumn()
  deleted_at: Date;

  /*@OneToMany(() => Language, (language) => language.banners)
  @JoinColumn({ name: 'id' })
  lang: Language[];*/

  @OneToOne(() => Archivo)
  @JoinColumn({ name: 'pdf' })
  pdf_info?: Archivo;

  @OneToOne(() => Archivo)
  @JoinColumn({ name: 'image' })
  image_info?: Archivo;
}
