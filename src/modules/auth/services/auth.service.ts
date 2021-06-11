import { dateCreate } from './../../../util/dateCreate';
import { authDto } from '../dto/auth.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { User } from './../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private _userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    console.log('validando');
    const user = await this._userRepository.findOne(
      { email } /*,
      {
        where: { email: email },
      },*/,
    );

    if (user) {
      const resp = {
        id: user.id,
        email: user.email,
        name: user.name,
        last_name: user.last_name,
        country: 'Colombia',
        employee_code: '' + user.employee_code,
        status: 1,
      };
      return resp;
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      country: user.country,
      employee_code: user.employee_code,
      profile: !user.profile ? 'user' : user.profile,
    };
    return {
      user: payload,
      expiresIn: 36000,
      access_token: this.jwtService.sign(payload),
    };
  }

  getUserByEmail(email: string): Promise<User> {
    return this._userRepository.findOne({ where: { email: email } });
  }
  /*
  async findAll(options: any): Promise<Pagination<User>> {
    console.log('entra');
    return paginate<any>(this._userRepository, options, {
      relations: ['roles'],
      where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }
  */

  async findOne(id: string) {
    const project = await this._userRepository.findOne(id, {
      relations: ['roles'],
    });
    if (!project) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return project;
  }

  async createFromSaml(data: authDto) {
    //create

    const userSave = {
      email: data.id,
      name: data.firstName,
      last_name: data.lastName,
      country: 'Colombia',
      employee_code: '' + new Date().getTime(),
      status: 1,
    };
    let newItem = await this._userRepository.create(userSave);
    this._userRepository.save(newItem);
    newItem.created_by = newItem.id;
    newItem.created_at = new dateCreate().sysdate;

    let addUserCreateAndDate = await this._userRepository.update(
      newItem.id,
      newItem,
    );

    return this.generateToken(newItem);
  }
  async create(data: authDto) {
    console.log(data);
    const user = await this._userRepository.find({ where: { email: data.id } });
    console.log(user);
    return;
    if (!user.length) {
      //create
      console.log('entra');
      const userSave = {
        email: data.id,
        name: data.firstName,
        last_name: data.lastName,
        country: 'Colombia',
        employee_code: '' + new Date().getTime(),
        status: 1,
      };
      const newItem = await this._userRepository.create(userSave);
      return this._userRepository.save(newItem);
    } else {
      /**user existe */
    }
    //return newItem;

    //const newItem = this._userRepository.create(data);
    // return this._userRepository.save(newItem);
    //return data;
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
      'c.status',
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
    return await this._userRepository.save(item);
  }

  async updateStatus(id: string) {
    let item = await this._userRepository.findOne(id);
    item.status = item.status == 0 ? 1 : 0;
    return this._userRepository.save(item);
  }

  async remove(id: string) {
    await this._userRepository.softDelete(id);
    return true;
  }
}
