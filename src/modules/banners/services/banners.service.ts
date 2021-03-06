import { bannersDto } from './../dto/banners.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Banner } from './../entities/banner.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private _bannersRepository: Repository<Banner>,
  ) {}

  /*async paginate() {
    //return this._bannersRepository.find();
    return this._bannersRepository.find({
      relations: ['pdf_info', 'image_info'],
    });
  }*/

  async paginate(options: any): Promise<Pagination<Banner>> {
    return paginate<any>(this._bannersRepository, options, {
      relations: ['pdf_info', 'image_info'],
      where: `(name_en like '%${options.search}%' OR name_es like '%${options.search}%')`,
    });
  }

  /*
  findOne(id: string) {
    const product = this._bannersRepository.findOne(id,{});
    if (!product) {
      throw new NotFoundException(`Banner #${id} not found`);
    }
    return product;
  }*/

  findOne(id: string) {
    const project = this._bannersRepository.findOne(id, {
      relations: ['pdf_info', 'image_info'],
    });
    if (!project) {
      throw new NotFoundException(`Banner #${id} not found`);
    }
    return project;
  }

  create(data: bannersDto) {
    const newItem = this._bannersRepository.create(data);
    return this._bannersRepository.save(newItem);
    //return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Banner>> {
    return paginate(this._bannersRepository, { page, limit });
  }

  async paginateAs(options: any): Promise<Pagination<Banner>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._bannersRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.image',
      'c.name_en',
      'c.name_es',
      'c.button_es',
      'c.button_en',
      'c.pdf',
      'c.url_redirect',
      'c.content_es',
      'c.content_en',
      'c.status',
      'c.deleted_at',
    ]);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%' or c.content_es like '%${options.search}%' OR c.content_en like '%${options.search}%')`,
      );
    }
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Banner>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._bannersRepository.findOne(id);
    this._bannersRepository.merge(item, changes);
    return this._bannersRepository.save(item);
  }
  async updateStatus(id: string) {
    let item = await this._bannersRepository.findOne(id);
    item.status = item.status == 0 ? 1 : 0;
    return this._bannersRepository.save(item);
  }

  async remove(id: string) {
    await this._bannersRepository.delete(id);
    return true;
  }
}
