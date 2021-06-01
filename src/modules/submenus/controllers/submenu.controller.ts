import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
  Request,
  UseInterceptors,
  UploadedFile,
  Redirect,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { submenuDto } from './../dto/submenu.dto';
import { submenuUpdateDto } from './../dto/submenu.update.dto';

import { SubmenuService } from './../services/submenu.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
const passport = require('passport');

@ApiTags('Submenus')
@Controller('submenus')
@ApiBearerAuth('JWT')
export class SubmenuController {
  constructor(
    private _submenuService: SubmenuService, //private _LanguageService: LanguageService,
  ) {}

  @Get()
  @HttpCode(200)
  getAll(@Req() request: Request) {
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];
    let options = {
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'user?search=' + search
          : process.env.API_URL + 'user',
    };
    return this._submenuService.findAll(options);
  }

  /*@Get()
  @HttpCode(200)
  findAll(@Req() request: Request) {
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._submenuService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'user?search=' + search
          : process.env.API_URL + 'user',
    });
  } */

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._submenuService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _submenuDto: submenuDto) {
    let data = _submenuDto;
    data.updated_by = _submenuDto.created_by;
    return this._submenuService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() _submenuDto: submenuUpdateDto) {
    let item = await this._submenuService.findOne(id);
    item.updated_by = _submenuDto.updated_by;
    item.name_en = _submenuDto.name_en;
    item.name_es = _submenuDto.name_es;
    console.log(item);
    return this._submenuService.update(id, item);
  }

  @Put('changestatus/:id')
  updateStatus(@Param('id') id: string) {
    return this._submenuService.updateStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._submenuService.remove(id);
  }
}
