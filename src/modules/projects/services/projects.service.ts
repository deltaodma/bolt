import { RolApps } from './../../../global/entities/rolapps.entity';
import { ProjectRolSubmenu } from './../../../global/entities/projectrolessubmenus.entity';
import { SubmenuGet } from './../../submenus/entities/submenuget.entity';
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
    @InjectRepository(Submenu) private _submenuRepository: Repository<Submenu>,
    @InjectRepository(ProjectRolSubmenu)
    private _projectRolSubmenuRepository: Repository<ProjectRolSubmenu>,
    @InjectRepository(RolApps)
    private _rolAppsRepository: Repository<RolApps>,
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

  async menuByUser(id: string, roles: []) {
    let queryBuilder = await this._projectsRepository
      .createQueryBuilder('proyectos')
      .select([
        'distinct(proyectos.id) id',
        'proyectos.icon icon',
        'proyectos.name_es name_es',
        'proyectos.name_en name_en',
        'proyectos.description_es description_es',
        'proyectos.description_en description_en',
        'proyectos.status status',
        'proyectos.created_at created_at',
        'proyectos.updated_at updated_at',
        'proyectos.deleted_at deleted_at',
        'pr.id projectrole_id',
      ])
      .innerJoin('project_roles', 'pr', 'proyectos.id = pr.project_id')
      //.innerJoin('pr.rolesSubmenu', 'roles_submenus')
      //.innerJoinAndSelect('roles.submenus.')
      .where('pr.rol_id IN (:ids)', { ids: roles })
      //.where('proyectos.id')
      //.where('proyectos.id IN(:ids)')
      //.setParameters({ ids: rolesString })
      //.printSql()
      .getRawMany();
    //.getSql();

    for (let i = 0; i < queryBuilder.length; i++) {
      //console.log('builder ', queryBuilder[i]);
      let subMenusProject = await this._projectRolSubmenuRepository
        .createQueryBuilder('rs')
        .select([
          's.id id',
          's.name_es as name_es',
          's.name_en as name_en',
          's.description_es as description_es',
          's.description_en as description_en',
          's.project_id as project_id',
          's.created_by as created_by',
          's.updated_by as updated_by',
          's.status as status',
          's.created_at as created_at',
          's.updated_at as updated_at',
          'rs.id as idprojectsubmenurol',
          'rs.projectrol_id',
          'rs.submenu_id',
          'rs.access',
        ])
        .innerJoin('submenus', 's', 'rs.submenu_id = s.id')
        .where('rs.projectrol_id = :projectrol_id', {
          projectrol_id: queryBuilder[i].projectrole_id,
        })
        .getRawMany();
      console.log('los submenus ', subMenusProject);
      queryBuilder[i]['submenus'] = subMenusProject;

      for (let j = 0; j < subMenusProject.length; j++) {
        let appsSubmenus = await this._rolAppsRepository
          .createQueryBuilder('a')
          .select([
            'apps.id as id',
            'apps.type_id as type_id',
            'apps.url as url',
            'apps.username as username',
            'apps.password as password',
            'apps.name_es as name_es',
            'apps.name_en as name_en',
            'apps.submenu_id as submenu_id',
            'apps.status as status',
            'apps.created_by as created_by',
            'apps.updated_by as updated_by',
            'apps.created_at as created_at',
            'apps.updated_at as updated_at',
          ])
          .innerJoin('apps', 'apps', 'a.app_id = apps.id')
          .where('a.submenu_role_id = :submenu_role_id', {
            submenu_role_id: subMenusProject[j].idprojectsubmenurol,
          })
          .getRawMany();

        //console.log('el valor de appsubmenus es ', appsSubmenus);
        queryBuilder[i]['submenus'][j]['apps'] = appsSubmenus;
      }
    }

    return queryBuilder;
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
