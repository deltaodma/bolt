import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Language } from './../entities/languaje.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language) private _languagesRepo: Repository<Language>,
  ) {}

  findAll() {
    return this._languagesRepo.find();
  }

  findOne(id: string) {
    const product = this._languagesRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    const newItem = this._languagesRepo.create(data);
    return this._languagesRepo.save(newItem);
  }

  async update(id: string, changes: any) {
    const item = await this._languagesRepo.findOne(id);
    this._languagesRepo.merge(item, changes);
    return this._languagesRepo.save(item);
  }

  async remove(id: string) {
    await this._languagesRepo.delete(id);
    return true;
  }
}
