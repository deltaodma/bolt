import { userRoleDto } from '../dto/userrole.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { UserRoles } from '../entities/userrole.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoles)
    private _userRolesRepository: Repository<UserRoles>,
  ) {}
  /*
  async findAll() {
    //return this._userRolesRepository.find();
    return this._userRolesRepository.find();
  }*/
  async findAll(options: any): Promise<Pagination<UserRoles>> {
    console.log('entra submenu roles');
    return paginate<any>(this._userRolesRepository, options, {
      relations: ['user', 'role'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }

  findUserRoles(id: string) {
    return this._userRolesRepository.find({ where: [{ user_id: id }] });
  }

  findOne(id: string) {
    const project = this._userRolesRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`User Role #${id} not found`);
    }
    return project;
  }

  create(data: userRoleDto[]) {
    const newItem = this._userRolesRepository.create(data);
    return this._userRolesRepository.save(newItem);
    return data;
  }

  async paginateAll(
    page: number,
    limit: number,
  ): Promise<Pagination<UserRoles>> {
    return paginate(this._userRolesRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<UserRoles>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._userRolesRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.user_id', 'c.rol_id']);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name like '%${options.search}%' OR c.last_name like '%${options.search}%' OR c.country like '%${options.search}%' OR c.eployee_code like '%${options.search}%')`,
      );
    }
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<UserRoles>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._userRolesRepository.findOne(id);
    this._userRolesRepository.merge(item, changes);
    return this._userRolesRepository.save(item);
  }

  async remove(id: string) {
    //await this._userRolesRepository.softDelete(id);
    await this._userRolesRepository.delete(id);
    return true;
  }

  async removeFromArray(data: UserRoles[]) {
    //await this._userRolesRepository.softDelete(id);
    await this._userRolesRepository.remove(data);
    return true;
  }
}
