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
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { submenuDto } from './../dto/submenu.dto';

import { SubmenuService } from './../services/submenu.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
const passport = require('passport');

@ApiTags('Submenus')
@Controller('submenus')
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
    return this._submenuService.create(_submenuDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _submenuDto: submenuDto) {
    return this._submenuService.update(id, _submenuDto);
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
