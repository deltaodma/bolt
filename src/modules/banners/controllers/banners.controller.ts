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
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
  MulterModule,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { get } from 'http';
import { getManager } from 'typeorm';
import { bannersDto } from './../dto/banners.dto';

import { BannersService } from './../services/banners.service';
import { ArchivoService } from './../../../global/services/archivos.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import * as dotenv from 'dotenv';
import { renameImage } from 'src/global/helpers/images.helper';
const globalVars = dotenv.config();
import { dateCreate } from './../../../util/dateCreate';
const path = require('path');
@ApiTags('Banners')
@UseGuards(JwtAuthGuard)
@Controller('banners')
@ApiBearerAuth('JWT')
export class BannersController {
  constructor(
    private _bannersService: BannersService,
    private _ArchivoService: ArchivoService,
  ) {}

  //@Get('none')
  //none() {
  //return this._bannersService.findAll();
  //return this._bannersService.prueba();
  //return this.paginar();
  //}
  /*
  @Get('filter')
  //getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
  getAll(@Query() { page, limit }) {
    limit = limit > 100 ? 100 : limit;

    return this._bannersService.paginate({
      limit: Number(limit),
      page: Number(page),
      route: process.env.API_URL + 'banners',
    });
  }*/

  @Get()
  //@HttpCode(200)
  findAll(@Req() request: Request) {
    //return `This action returns all products. Limit ${limit}, offset: ${offset}`;
    console.log(request['query']['search']);
    let { page, limit, search } = request['query'];
    search == undefined ? (search = '') : request['query']['search'];
    limit == undefined ? (limit = 10) : request['query']['limit'];
    page == undefined ? (page = 1) : request['query']['page'];

    return this._bannersService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'banners?search=' + search
          : process.env.API_URL + 'banners',
    });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: diskStorage({
        destination:
          './uploads/' +
          new Date().getFullYear() +
          '/' +
          new Date().getMonth() +
          '/' +
          new Date().getDate(),
        filename: renameImage,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const archivo = {
      name: file.filename,
      relative_path: file.destination.split('./')[1],
      full_path: file.destination.split('./')[1] + '/' + file.filename,
    };
    return this._ArchivoService.create(archivo);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    return this._bannersService.findOne(id);
  }

  //@UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  //@HttpCode(204)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination:
            './client/uploads/' +
            new Date().getFullYear() +
            '/' +
            (new Date().getMonth() + 1) +
            '/' +
            new Date().getDate(),
          filename: renameImage,
        }),
      },
    ),
  )
  async create(@UploadedFiles() files, @Body() _bannersDto: bannersDto) {
    if (files.image != undefined) {
      let archivoImg = {
        name: files.image[0].filename,
        relative_path: files.image[0].destination.split('client')[1],
        full_path:
          files.image[0].destination.split('client')[1] +
          '/' +
          files.image[0].filename,
      };
      let imageSave = await this._ArchivoService.create(archivoImg);
      _bannersDto.image = imageSave['id'];
    }

    if (files.pdf != undefined) {
      let archivoPdf = {
        name: files.pdf[0].filename,
        relative_path: files.pdf[0].destination.split('client')[1],
        full_path:
          files.pdf[0].destination.split('client')[1] +
          '/' +
          files.pdf[0].filename,
      };
      let pdfSave = await this._ArchivoService.create(archivoPdf);
      _bannersDto.pdf = pdfSave['id'];
    }
    //console.log('ruta raiz ', path.basename);

    _bannersDto.created_at = new dateCreate().sysdate;
    _bannersDto.updated_at = _bannersDto.created_at;
    return this._bannersService.create(_bannersDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _bannersDto: bannersDto) {
    return this._bannersService.update(id, _bannersDto);
  }

  @Put('changestatus/:id')
  updateStatus(@Param('id') id: string) {
    return this._bannersService.updateStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._bannersService.remove(id);
  }
}
