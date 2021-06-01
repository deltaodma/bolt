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
import { userRoleDto } from './../dto/userrole.dto';

import { UserRoleService } from './../services/userrole.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();

@ApiTags('UserRoles')
@Controller('user-role')
@ApiBearerAuth('JWT')
export class UserRoleController {
  constructor(
    private _userService: UserRoleService, //private _LanguageService: LanguageService,
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

    return this._userService.findAll({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'user?search=' + search
          : process.env.API_URL + 'user',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._userService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _userDto: userRoleDto) {
    return this._userService.create(_userDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _userDto: userRoleDto) {
    return this._userService.update(id, _userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._userService.remove(id);
  }
}
