import { Submenu } from './../../submenus/entities/submenu.entity';
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
    @InjectRepository(Submenu) private _submenuRepository: Repository<Project>,
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

  async findOneMenu(id: string) {
    return this._projectsRepository.findOne(id, {
      relations: ['submenus', 'submenus.apps'],
    });
  }

  async submenus(project_id) {
    let submenus = this._submenuRepository.find();
    return submenus;
  }

  async menu(options: any): Promise<Pagination<Project>> {
    return paginate<Project>(this._projectsRepository, options, {
      relations: ['submenus', 'submenus.apps'],
    });
    /*return this._projectsRepository.find({
      relations: ['submenus', 'submenus.apps'],
    }); */
  }

  async menuByRol(options: any): Promise<Pagination<Project>> {
    return paginate<Project>(this._projectsRepository, options, {
      relations: ['submenus', 'submenus.apps'],
    });
    /*return this._projectsRepository.find({
      relations: ['submenus', 'submenus.apps'],
    }); */
  }

  create(data: projectsDto) {
    const newItem = this._projectsRepository.create(data);
    return this._projectsRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Project>> {
    return paginate(this._projectsRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<Submenu>> {
    return paginate<any>(this._projectsRepository, options, {
      relations: ['submenus'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }
  /* 
  async paginate(options: any): Promise<Pagination<Project>> {
    const queryBuilder = this._projectsRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.icon',
      'c.name_es',
      'c.name_en',
      'c.description_es',
      'c.description_en',
      'c.status',
      'c.deleted_at',
    ]);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%')`,
      );
    }

    return paginate<Project>(queryBuilder, options);
  } */

  async update(id: string, changes: any) {
    const item = await this._projectsRepository.findOne(id);
    this._projectsRepository.merge(item, changes);
    return this._projectsRepository.save(item);
  }

  async updateStatus(id: string) {
    let item = await this._projectsRepository.findOne(id);
    item.status = item.status == 0 ? 1 : 0;
    return this._projectsRepository.save(item);
  }

  async remove(id: string) {
    await this._projectsRepository.delete(id);
    return true;
  }
}
