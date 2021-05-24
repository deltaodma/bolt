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
import { projectroleDto } from './../dto/projectrole.dto';

import { ProjectRoleService } from './../services/projectroles.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
const passport = require('passport');

@ApiTags('Projectroles')
@Controller('projectRoles')
export class ProjectRoleController {
  constructor(
    private _ProjectRoleService: ProjectRoleService, //private _LanguageService: LanguageService,
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
    return this._ProjectRoleService.findAll(options);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._ProjectRoleService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _submenuDto: projectroleDto) {
    return this._ProjectRoleService.create(_submenuDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _submenuDto: projectroleDto) {
    return this._ProjectRoleService.update(id, _submenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._ProjectRoleService.remove(id);
  }
}
