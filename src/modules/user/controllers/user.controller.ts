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
import { userDto } from './../dto/user.dto';

import { UserService } from './../services/user.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags } from '@nestjs/swagger';
import { ConfigSaml } from './config';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService, //private _LanguageService: LanguageService,
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
    return this._userService.findAll(options);
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

  @Get('saml')
  getSaml() {
    const config = new ConfigSaml();
    console.log(config);

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      done(null, user);
    });

    passport.use(
      new SamlStrategy(config.passport['saml'], function (profile, done) {
        return done(null, {
          id: profile.nameID,
          email:
            profile[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ],
          displayName:
            profile['http://schemas.microsoft.com/identity/claims/displayname'],
          firstName:
            profile[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
            ],
          lastName:
            profile[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
            ],
        });
      }),
    );
    //@Redirect('https://nestjs.com', 301);
    passport.authenticate(config.passport['strategy'], {
      successRedirect: '/',
      failureRedirect: '/login',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._userService.findOne(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _userDto: userDto) {
    return this._userService.create(_userDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _userDto: userDto) {
    return this._userService.update(id, _userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._userService.remove(id);
  }
}
