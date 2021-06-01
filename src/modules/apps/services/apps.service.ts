import { appsDto } from '../dto/apps.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection, Like } from 'typeorm';
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

  async appAsociadas() {
    return this._appsRepository.find({ relations: ['type', 'submenu'] });
  }

  async findAll(options: any): Promise<Pagination<App>> {
    console.log('entra find allddd');
    return paginate<any>(this._appsRepository, options, {
      relations: ['type', 'user_created', 'user_update'],
      where: `(name_es like '%${options.search}%' OR name_en like '%${options.search}%')`,
      //where: { firstName: "Timber", lastName: "Saw" }
    });
  }

  findOne(id: string) {
    const app = this._appsRepository.findOne(id, {
      relations: ['type', 'user_created', 'user_update'],
    });
    if (!app) {
      throw new NotFoundException(`App #${id} not found`);
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
      'c.name_es',
      'c.name_en',
      'c.submenu_id',
      'c.deleted_at',
    ]);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%')`,
      );
    }
    queryBuilder.relation('type');

    return paginate<App>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._appsRepository.findOne(id);
    this._appsRepository.merge(item, changes);
    return this._appsRepository.save(item);
  }

  async updateStatus(id: string) {
    let item = await this._appsRepository.findOne(id);
    item.status = item.status == 0 ? 1 : 0;
    return this._appsRepository.save(item);
  }

  async remove(id: string) {
    await this._appsRepository.delete(id);
    return true;
  }
}
