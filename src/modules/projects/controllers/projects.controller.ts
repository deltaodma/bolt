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
import { projectsDto } from './../dto/projects.dto';

import { ProjectsService } from './../services/projects.service';
//import { LanguageService } from './../../global/services/language.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import * as dotenv from 'dotenv';
import { renameImage } from 'src/global/helpers/images.helper';
import { GetUser } from 'src/modules/auth/getuser.decorator';
const globalVars = dotenv.config();

@ApiTags('Projects')
@UseGuards(JwtAuthGuard)
@Controller('projects')
@ApiBearerAuth('JWT')
export class ProjectsController {
  constructor(
    private _projectsService: ProjectsService, //private _LanguageService: LanguageService,
  ) {}

  @Get()
  //@HttpCode(200)
  findAll(@Req() request: Request) {
    //return `This action returns all products. Limit ${limit}, offset: ${offset}`;
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._projectsService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'projects?search=' + search
          : process.env.API_URL + 'projects',
    });
  }

  @Get('menu')
  getMenu(@Req() request: Request) {
    //return this._projectsService.menu();
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._projectsService.menu({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'projects/menu?search=' + search
          : process.env.API_URL + 'projects/menu',
    });
  }

  @Get('menubyrol')
  getMenuByRol(@Req() request: Request) {
    //return this._projectsService.menu();
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._projectsService.menuByRol({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'projects/menu?search=' + search
          : process.env.API_URL + 'projects/menu',
    });
  }

  @Get('menubyuser')
  menuUser(@GetUser() user) {
    console.log('in project controller route ', user.roles);
    const roles = user.roles.map((item) => {
      return item.id;
    });
    console.log('los roles son ', roles);
    return this._projectsService.menuByUser(user.id, roles);
  }

  @Get('menu/:id')
  getMenuOne(@Param('id') id: string) {
    return this._projectsService.findOneMenu(id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._projectsService.findOneMenu(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _projectsDto: projectsDto) {
    return this._projectsService.create(_projectsDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _projectsDto: projectsDto) {
    return this._projectsService.update(id, _projectsDto);
  }

  @Put('changestatus/:id')
  updateStatus(@Param('id') id: string) {
    return this._projectsService.updateStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._projectsService.remove(id);
  }
}
