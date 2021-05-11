import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { get } from 'http';
import { getManager } from 'typeorm';
import { bannersDto } from './../dto/banners.dto';

import { BannersService } from './../services/banners.service';
//import { LanguageService } from './../../global/services/language.service';

export const BLOG_ENTRIES_URL = 'http://localhost:3000/api/v1/banners';

@Controller('banners')
export class BannersController {
  constructor(
    private _bannersService: BannersService, //private _LanguageService: LanguageService,
  ) {}

  @Get()
  getAll() {
    return this._bannersService.findAll();
    //return this._bannersService.prueba();
  }

  @Get('paginar')
  paginar(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
    limit = limit > 100 ? 100 : limit;

    return this._bannersService.paginate({
      limit: Number(limit),
      page: Number(page),
      route: BLOG_ENTRIES_URL,
    });
  }

  @Get('filter')
  findAll(@Query() paginationQuery: any) {
    const { limit, offset } = paginationQuery;
    return `This action returns all products. Limit ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._bannersService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _bannersDto: bannersDto) {
    return this._bannersService.create(_bannersDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _bannersDto: bannersDto) {
    return this._bannersService.update(id, _bannersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._bannersService.remove(id);
  }
}
