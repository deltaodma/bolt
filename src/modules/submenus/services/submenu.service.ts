import { submenuDto } from '../dto/submenu.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Submenu } from '../entities/submenu.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SubmenuService {
  constructor(
    @InjectRepository(Submenu) private _submenuRepository: Repository<Submenu>,
  ) {}

  async findAll(options: any): Promise<Pagination<Submenu>> {
    console.log('entra');
    return paginate<any>(this._submenuRepository, options, {
      relations: ['user_created', 'user_update'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }

  findOne(id: string) {
    const project = this._submenuRepository.findOne(id, {
      relations: ['user_created', 'user_updated'],
    });
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  create(data: submenuDto) {
    const newItem = this._submenuRepository.create(data);
    return this._submenuRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Submenu>> {
    return paginate(this._submenuRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<Submenu>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._submenuRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.project_id',
      'c.created_by',
      'c.updated_by',
      'c.status',
    ]);

    /*if (options.search != '') {
      queryBuilder.where(
        `(c.name like '%${options.search}%' OR c.last_name like '%${options.search}%' OR c.country like '%${options.search}%' OR c.eployee_code like '%${options.search}%')`,
      );
    } */
    queryBuilder.relation('user_created');
    queryBuilder.relation('user_updated');
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Submenu>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._submenuRepository.findOne(id);
    this._submenuRepository.merge(item, changes);
    return this._submenuRepository.save(item);
  }

  async updateStatus(id: string) {
    let item = await this._submenuRepository.findOne(id);
    item.status = item.status == 0 ? 1 : 0;
    return this._submenuRepository.save(item);
  }

  async remove(id: string) {
    await this._submenuRepository.softDelete(id);
    return true;
  }
}
