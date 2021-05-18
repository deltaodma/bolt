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
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { rolesDto } from './../dto/roles.dto';

import { RolesService } from './../services/roles.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { renameImage } from 'src/global/helpers/images.helper';
const globalVars = dotenv.config();

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private _rolesService: RolesService, //private _LanguageService: LanguageService,
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

    return this._rolesService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'roles?search=' + search
          : process.env.API_URL + 'roles',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._rolesService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _rolesDto: rolesDto) {
    return this._rolesService.create(_rolesDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _rolesDto: rolesDto) {
    return this._rolesService.update(id, _rolesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._rolesService.remove(id);
  }
}
