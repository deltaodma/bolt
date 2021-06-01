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
  UseGuards,
} from '@nestjs/common';
import { get } from 'http';
import { getManager } from 'typeorm';
import { appsDto } from './../dto/apps.dto';

import { AppsService } from './../services/apps.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import * as dotenv from 'dotenv';
import { renameImage } from 'src/global/helpers/images.helper';
import { dateCreate } from './../../../util/dateCreate';
const globalVars = dotenv.config();

@ApiTags('Apps')
@UseGuards(JwtAuthGuard)
@Controller('apps')
@ApiBearerAuth('JWT')
export class AppsController {
  constructor(
    private _appsService: AppsService, //private _LanguageService: LanguageService,
  ) {}

  @Get('assoc')
  test() {
    return this._appsService.appAsociadas();
  }

  @Get()
  //  @HttpCode(200)
  findAll(@Req() request: Request) {
    //return `This action returns all products. Limit ${limit}, offset: ${offset}`;
    //console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._appsService.findAll({
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

  //@UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _appsDto: appsDto) {
    //_appsDto.created_by = '7ac99af7-9ad5-44c6-97c0-790d242faf7b';
    _appsDto.updated_by = _appsDto.created_by;
    _appsDto.created_at = new dateCreate().sysdate;
    _appsDto.updated_at = _appsDto.created_at;

    return this._appsService.create(_appsDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _appsDto: appsDto) {
    _appsDto.updated_by = '7ac99af7-9ad5-44c6-97c0-790d242faf7b';
    return this._appsService.update(id, _appsDto);
  }

  @Put('changestatus/:id')
  updateStatus(@Param('id') id: string) {
    return this._appsService.updateStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._appsService.remove(id);
  }
}
