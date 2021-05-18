import { rolesDto } from '../dto/roles.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Role } from '../entities/roles.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private _projectsRepository: Repository<Role>,
  ) {}

  async findAll() {
    //return this._projectsRepository.find();
    return this._projectsRepository.find();
  }

  findOne(id: string) {
    const project = this._projectsRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  create(data: rolesDto) {
    const newItem = this._projectsRepository.create(data);
    return this._projectsRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Role>> {
    return paginate(this._projectsRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<Role>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._projectsRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.name_es', 'c.name_en', 'c.deleted_at']);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%')`,
      );
    }
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Role>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._projectsRepository.findOne(id);
    this._projectsRepository.merge(item, changes);
    return this._projectsRepository.save(item);
  }

  async remove(id: string) {
    //await this._projectsRepository.delete(id);
    await this._projectsRepository.softDelete(id);
    return true;
  }
}
