import { RolApps } from './../../../global/entities/rolapps.entity';
import { appRolDto } from './../../../global/dto/approl.dto';
import { roleSubmenuDto } from './../dto/rolesubmenu.dto';
import { RolesService } from './../../roles/services/roles.service';
import { Role } from './../../roles/entities/roles.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { projectroleDto } from '../dto/projectrole.dto';
import { ProjectRole } from '../entities/projectroles.entity';
import { ProjectRolSubmenu } from 'src/global/entities/projectrolessubmenus.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { rolesDto } from 'src/modules/roles/dto/roles.dto';

@Injectable()
export class ProjectRoleService {
  constructor(
    @InjectRepository(ProjectRole)
    private _projectRoleRespository: Repository<ProjectRole>,
    @InjectRepository(ProjectRolSubmenu)
    private _projectRoleSubmenuRepository: Repository<ProjectRolSubmenu>,
    @InjectRepository(RolApps)
    private _rolAppRepository: Repository<RolApps>,
    private _roleService: RolesService,
  ) {}

  async findAll(options: any): Promise<Pagination<ProjectRole>> {
    return paginate<any>(this._projectRoleRespository, options, {
      relations: ['rol', 'project'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }

  findOne(id: string) {
    const project = this._projectRoleRespository.findOne(id, {
      relations: ['rol', 'project'],
    });
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  async findOneRolSubmenu(id: string) {
    const rolsubmenu = await this._projectRoleSubmenuRepository.findOne(id);
    return rolsubmenu;
  }

  async create(data: projectroleDto) {
    console.log('data a guadar projectroledto en projectroleserivice', data);

    let newItem = this._projectRoleRespository.create(data);
    return this._projectRoleRespository.save(newItem);
  }

  async createRol(data: rolesDto) {
    return await this._roleService.create(data);
  }

  async createSubmenuRole(data: roleSubmenuDto) {
    console.log('en service submenurole', data);
    const item = await this._projectRoleSubmenuRepository.create(data);
    return this._projectRoleSubmenuRepository.save(item);
    //console.log(item);

    /*const queryBuilder = await this._projectRoleRespository
      .createQueryBuilder()
      .insert()
      .into(ProjectRoleSubmenu)
      .values([
        { projectrol_id: data.projectrol_id, submenu_id: data.submenu_id },
      ])
      .execute();
    //console.log('querybuilder ', queryBuilder);
    return queryBuilder;*/
  }

  async createAppRole(data: appRolDto) {
    const queryBuilder = await this._rolAppRepository
      .createQueryBuilder()
      .insert()
      .into(RolApps)
      .values([{ app_id: data.app_id, submenu_rol_id: data.submenu_rol_id }])
      .execute();

    return queryBuilder;
  }

  async paginateAll(
    page: number,
    limit: number,
  ): Promise<Pagination<ProjectRole>> {
    return paginate(this._projectRoleRespository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<ProjectRole>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._projectRoleRespository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.rol_id', 'c.project_id']);

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
    const item = await this._projectRoleRespository.findOne(id);
    this._projectRoleRespository.merge(item, changes);
    return this._projectRoleRespository.save(item);
  }

  async remove(id: string) {
    await this._projectRoleRespository.softDelete(id);
    return true;
  }
}
