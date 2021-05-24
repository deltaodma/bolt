import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { projectroleDto } from '../dto/projectrole.dto';
import { ProjectRole } from '../entities/projectroles.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProjectRoleService {
  constructor(
    @InjectRepository(ProjectRole)
    private _submenuRepository: Repository<ProjectRole>,
  ) {}

  async findAll(options: any): Promise<Pagination<ProjectRole>> {
    return paginate<any>(this._submenuRepository, options, {
      relations: ['rol', 'project'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }

  findOne(id: string) {
    const project = this._submenuRepository.findOne(id, {
      relations: ['rol', 'project'],
    });
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  create(data: projectroleDto) {
    const newItem = this._submenuRepository.create(data);
    return this._submenuRepository.save(newItem);
    return data;
  }

  async paginateAll(
    page: number,
    limit: number,
  ): Promise<Pagination<ProjectRole>> {
    return paginate(this._submenuRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<ProjectRole>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._submenuRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.role_id', 'c.project_id']);

    /*if (options.search != '') {
      queryBuilder.where(
        `(c.name like '%${options.search}%' OR c.last_name like '%${options.search}%' OR c.country like '%${options.search}%' OR c.eployee_code like '%${options.search}%')`,
      );
    } */
    queryBuilder.relation('rol');
    queryBuilder.relation('project');
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<ProjectRole>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._submenuRepository.findOne(id);
    this._submenuRepository.merge(item, changes);
    return this._submenuRepository.save(item);
  }

  async remove(id: string) {
    await this._submenuRepository.softDelete(id);
    return true;
  }
}
