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
} from '@nestjs/common';
import { get } from 'http';
import { getManager } from 'typeorm';
import { appsDto } from './../dto/apps.dto';

import { AppsService } from './../services/apps.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { renameImage } from 'src/global/helpers/images.helper';
const globalVars = dotenv.config();

@ApiTags('Apps')
@Controller('apps')
export class AppsController {
  constructor(
    private _appsService: AppsService, //private _LanguageService: LanguageService,
  ) {}

  @Get()
  @HttpCode(200)
  findAll(@Req() request: Request) {
    //return `This action returns all products. Limit ${limit}, offset: ${offset}`;
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._appsService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'apps?search=' + search
          : process.env.API_URL + 'apps',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._appsService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _projectsDto: appsDto) {
    return this._appsService.create(_projectsDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _projectsDto: appsDto) {
    return this._appsService.update(id, _projectsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._appsService.remove(id);
  }
}
