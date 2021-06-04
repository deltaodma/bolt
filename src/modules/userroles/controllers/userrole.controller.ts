import { UserService } from './../../user/services/user.service';
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
    private _userRolService: UserRoleService, //private _LanguageService: LanguageService,
    private _userService: UserService,
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

    return this._userRolService.findAll({
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
    return this._userRolService.findOne(id);
  }

  //@UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(':id')
  async create(@Param('id') id: string, @Body() _userDto: userRoleDto[]) {
    const rolesSave = await this._userRolService.create(_userDto);
    let result = await this._userService.findOne(rolesSave[0].user_id);
    result.updated_by = id;
    const actualizarUser = await this._userService.update(
      rolesSave[0].user_id,
      result,
    );
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() _userDto: userRoleDto[]) {
    //return this._userRolService.update(userDto);
    let buscarData = await this._userRolService.findUserRoles(
      _userDto[0].user_id,
    );
    if (buscarData.length > 0) {
      const deleleRecords = await this._userRolService.removeFromArray(
        buscarData,
      );
      const rolesSave = await this._userRolService.create(_userDto);
      let result = await this._userService.findOne(rolesSave[0].user_id);
      result.updated_by = id;
      const actualizarUser = await this._userService.update(
        rolesSave[0].user_id,
        result,
      );
      return result;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._userRolService.remove(id);
  }
}
