import { projectsDto } from '../dto/projects.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Project } from '../entities/projects.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private _projectsRepository: Repository<Project>,
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

  create(data: projectsDto) {
    const newItem = this._projectsRepository.create(data);
    return this._projectsRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Project>> {
    return paginate(this._projectsRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<Project>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._projectsRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.icono',
      'c.name_es',
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

    return paginate<Project>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._projectsRepository.findOne(id);
    this._projectsRepository.merge(item, changes);
    return this._projectsRepository.save(item);
  }

  async remove(id: string) {
    await this._projectsRepository.delete(id);
    return true;
  }
}