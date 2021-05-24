import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Archivo } from './../entities/archivos.entity';

@Injectable()
export class ArchivoService {
  constructor(
    @InjectRepository(Archivo) private _archivosRepository: Repository<Archivo>,
  ) {}

  findAll() {
    return this._archivosRepository.find();
  }

  findOne(id: string) {
    const product = this._archivosRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`file #${id} not found`);
    }
    return product;
  }

  create(data: any) {
    const newItem = this._archivosRepository.create(data);
    return this._archivosRepository.save(newItem);
  }

  async update(id: string, changes: any) {
    const item = await this._archivosRepository.findOne(id);
    this._archivosRepository.merge(item, changes);
    return this._archivosRepository.save(item);
  }

  async remove(id: string) {
    await this._archivosRepository.delete(id);
    return true;
  }
}
