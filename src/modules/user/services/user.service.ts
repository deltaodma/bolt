import { userDto } from '../dto/user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { User } from '../entities/user.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
  ) {}

  //async findAll() {
  //return this._userRepository.find();
  //return this._userRepository.find({ relations: ['roles'] });

  //}

  async findAll(options: any): Promise<Pagination<User>> {
    console.log('entra');
    return paginate<any>(this._userRepository, options, {
      relations: ['roles'],
      where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }

  findOne(id: string) {
    const project = this._userRepository.findOne(id, { relations: ['roles'] });
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  create(data: userDto) {
    const newItem = this._userRepository.create(data);
    return this._userRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<User>> {
    return paginate(this._userRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<User>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._userRepository.createQueryBuilder('c');
    queryBuilder.select([
      'c.id',
      'c.name',
      'c.last_name',
      'c.country',
      'c.employee_code',
      'c.deleted_at',
    ]);

    if (options.search != '') {
      queryBuilder.where(
        `(c.name like '%${options.search}%' OR c.last_name like '%${options.search}%' OR c.country like '%${options.search}%' OR c.eployee_code like '%${options.search}%')`,
      );
    }
    queryBuilder.relation('roles');
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<User>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._userRepository.findOne(id);
    this._userRepository.merge(item, changes);
    return this._userRepository.save(item);
  }

  async remove(id: string) {
    await this._userRepository.softDelete(id);
    return true;
  }
}
