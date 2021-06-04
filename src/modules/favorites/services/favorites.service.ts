import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Favorite } from '../entities/favorites.entity';
import { favoriteDto } from '../dto/favorites.dto';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private _favoriteRepository: Repository<Favorite>,
  ) {}

  async findAll() {
    //return this._favoriteRepository.find();
    return this._favoriteRepository.find();
  }

  findOne(id: string) {
    const project = this._favoriteRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return project;
  }

  /*
  async paginate(options: any): Promise<Pagination<Favorite>> {
    return paginate<any>(this._favoriteRepository, options, {
      relations: ['app', 'user'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }
*/
  findUserFavorites(user_id: string, options: any) {
    /*return paginate<any>(this._favoriteRepository, options, {
      relations: ['app', 'user', 'apps.type'],
      where: `(user_id = '${user_id}')`,
    });*/

    const queryBuilder = this._favoriteRepository
      .createQueryBuilder('c')
      .select([
        'c.id id',
        'c.app_id app_id',
        'c.user_id user_id',
        'apps.name_en name_en',
        'apps.name_es name_es',
        'types.name as name',
      ])
      .innerJoin('c.app', 'apps')
      .innerJoin('c.user', 'users')
      .innerJoin('apps.type', 'types')
      .where('c.user_id = :user', { user: user_id })
      .getRawMany();
    return queryBuilder;
  }

  create(data: favoriteDto) {
    const newItem = this._favoriteRepository.create(data);
    return this._favoriteRepository.save(newItem);
    return data;
  }

  async paginateAll(
    page: number,
    limit: number,
  ): Promise<Pagination<Favorite>> {
    return paginate(this._favoriteRepository, { page, limit });
  }
  /*
  async paginate(options: any): Promise<Pagination<Favorite>> {
    //console.log('in bannerservice ', options.search);
    const queryBuilder = this._favoriteRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.app_id', 'c.user_id']);
    if (options.search != '') {
      queryBuilder.where(
        `(c.name_es like '%${options.search}%' OR c.name_en like '%${options.search}%')`,
      );
    }
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do
    queryBuilder.relation('user');

    return paginate<Favorite>(queryBuilder, options);
  } */

  async paginate(options: any): Promise<Pagination<Favorite>> {
    return paginate<any>(this._favoriteRepository, options, {
      relations: ['app', 'user'],
      //where: `(name like '%${options.search}%' OR last_name like '%${options.search}%')`,
    });
  }

  async update(id: string, changes: any) {
    const item = await this._favoriteRepository.findOne(id);
    this._favoriteRepository.merge(item, changes);
    return this._favoriteRepository.save(item);
  }

  async remove(id: string) {
    //await this._favoriteRepository.delete(id);
    await this._favoriteRepository.delete(id);
    return true;
  }
}
