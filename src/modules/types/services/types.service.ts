import { typesDto } from '../dto/types.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Type } from '../entities/types.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type) private _typesRepository: Repository<Type>,
  ) {}

  async findAll() {
    //return this._typesRepository.find();
    return this._typesRepository.find();
  }

  findOne(id: string) {
    const project = this._typesRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  create(data: typesDto) {
    const newItem = this._typesRepository.create(data);
    return this._typesRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Type>> {
    return paginate(this._typesRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<Type>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._typesRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.icono',
      'c.name_es',
      'c.name_en',
      'c.deleted_at',
    ]);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%')`,
      );
    }
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Type>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._typesRepository.findOne(id);
    this._typesRepository.merge(item, changes);
    return this._typesRepository.save(item);
  }

  async remove(id: string) {
    await this._typesRepository.delete(id);
    return true;
  }
}
