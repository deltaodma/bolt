import { appsDto } from '../dto/apps.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { App } from '../entities/apps.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App) private _appsRepository: Repository<App>,
  ) {}

  async findAll() {
    //return this._appsRepository.find();
    return this._appsRepository.find();
  }

  findOne(id: string) {
    const app = this._appsRepository.findOne(id);
    if (!app) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return app;
  }

  create(data: appsDto) {
    const newItem = this._appsRepository.create(data);
    return this._appsRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<App>> {
    return paginate(this._appsRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<App>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._appsRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.type_id',
      'c.url',
      'c.name_en',
      'c.description_es',
      'c.description_en',
      'c.deleted_at',
    ]);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%')`,
      );
    }
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<App>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._appsRepository.findOne(id);
    this._appsRepository.merge(item, changes);
    return this._appsRepository.save(item);
  }

  async remove(id: string) {
    await this._appsRepository.delete(id);
    return true;
  }
}
