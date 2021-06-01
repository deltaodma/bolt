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
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { typesDto } from './../dto/types.dto';

import { TypesService } from './../services/types.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();

@ApiTags('Types')
@UseGuards(JwtAuthGuard)
@Controller('types')
@ApiBearerAuth('JWT')
export class TypesController {
  constructor(
    private _typesService: TypesService, //private _LanguageService: LanguageService,
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

    return this._typesService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'types?search=' + search
          : process.env.API_URL + 'types',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._typesService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _typesDto: typesDto) {
    return this._typesService.create(_typesDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _typesDto: typesDto) {
    return this._typesService.update(id, _typesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._typesService.remove(id);
  }
}
