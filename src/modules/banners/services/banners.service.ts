import { bannersDto } from './../dto/banners.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { Banner } from './../entities/banner.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private _bannersRepository: Repository<Banner>,
  ) {}

  async findAll() {
    //return this._bannersRepository.find();
    return this._bannersRepository.find({ relations: ['lang'] });
  }

  findOne(id: string) {
    const product = this._bannersRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: bannersDto) {
    const newItem = this._bannersRepository.create(data);
    return this._bannersRepository.save(newItem);
    return data;
  }

  async paginateAll(page: number, limit: number): Promise<Pagination<Banner>> {
    return paginate(this._bannersRepository, { page, limit });
  }

  async paginate(options: any): Promise<Pagination<Banner>> {
    const queryBuilder = this._bannersRepository.createQueryBuilder('c');
    //queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Banner>(queryBuilder, options);
  }

  async update(id: string, changes: any) {
    const item = await this._bannersRepository.findOne(id);
    this._bannersRepository.merge(item, changes);
    return this._bannersRepository.save(item);
  }

  async remove(id: string) {
    await this._bannersRepository.delete(id);
    return true;
  }
}
