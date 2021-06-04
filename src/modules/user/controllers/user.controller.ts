import {
  Controller,
  Get,
  Param,
  Req,
  Post,
  Body,
  Put,
  Delete,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { userDto } from './../dto/user.dto';

import { UserService } from './../services/user.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { ConfigSaml } from './config';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiBearerAuth('JWT')
export class UserController {
  public config: any;
  constructor(
    private _userService: UserService, //private _LanguageService: LanguageService,
  ) {
    this.config = new ConfigSaml();
  }

  @Get()
  //@HttpCode(200)
  async getAllUser(
    @Req() request: Request,
    @Body() searchForm: { name: string; country: string },
  ) {
    //console.log(request['query']['search']);
    console.log('searchform', searchForm);
    let { page, limit, search } = request['query'];
    search = Object.keys(searchForm);

    search.length == 0
      ? (search = { name: '', country: '' })
      : (search = searchForm);

    console.log('el search', search.name);

    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];
    let options = {
      limit: Number(limit),
      page: Number(page),
      search: search,
      route:
        search != ''
          ? process.env.API_URL + 'user'
          : process.env.API_URL + 'user',
    };
    const resultList = await this._userService.findAll(options);
    if (resultList.items.length == 0) {
      throw new HttpException({ error: 'records not found' }, HttpStatus.OK);
    } else return resultList;
  }

  @Post()
  //@HttpCode(200)
  async getAll(
    @Req() request: Request,
    @Body() searchForm: { name: string; country: string },
  ) {
    //console.log(request['query']['search']);
    console.log('searchform', searchForm);
    let { page, limit, search } = request['query'];
    search = Object.keys(searchForm);

    search.length == 0
      ? (search = { name: '', country: '' })
      : (search = searchForm);

    console.log('el search', search.name);

    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];
    let options = {
      limit: Number(limit),
      page: Number(page),
      search: search,
      route:
        search != ''
          ? process.env.API_URL + 'user'
          : process.env.API_URL + 'user',
    };
    const resultList = await this._userService.findAll(options);
    if (resultList.items.length == 0) {
      throw new HttpException({ error: 'records not found' }, HttpStatus.OK);
    } else return resultList;
  }

  /*@Get()
  @HttpCode(200)
  findAll(@Req() request: Request) {
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._userService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'user?search=' + search
          : process.env.API_URL + 'user',
    });
  } */
  /*
  @Get('other')
  otro() {
    passport.authenticate(this.config.passport.strategy, {
      successRedirect: '/',
      failureRedirect: '/login',
    });
  } */

  @Get('other')
  otro() {
    passport.authenticate(this.config.passport.strategy, {
      successRedirect: '/',
      failureRedirect: '/login',
    });
  }

  @Get('saml')
  getSaml() {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._userService.findOne(id);
  }

  //@UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('createuser')
  create(@Body() _userDto: userDto) {
    return this._userService.create(_userDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _userDto: userDto) {
    return this._userService.update(id, _userDto);
  }

  @Put('changestatus/:id')
  async updateStatus(
    /*@Headers('Authorization') auth: string,*/
    @Param('id') id: string,
  ) {
    return await this._userService.updateStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._userService.remove(id);
  }
}
