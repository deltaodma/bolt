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
  Request,
  UseGuards,
} from '@nestjs/common';
import { favoriteDto } from './../dto/favorites.dto';

import { FavoriteService } from './../services/favorites.service';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { dateCreate } from './../../../util/dateCreate';
import { GetUser } from './../../auth/getuser.decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
@ApiTags('Favorites')
@UseGuards(JwtAuthGuard)
@Controller('favorites')
@ApiBearerAuth('JWT')
export class FavoritesController {
  constructor(
    private _favoriteService: FavoriteService, //private _LanguageService: LanguageService,
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

    return this._favoriteService.paginate({
      limit: Number(limit),
      page: Number(page),
      search: String(search),
      route:
        search != ''
          ? process.env.API_URL + 'favorites?search=' + search
          : process.env.API_URL + 'favorites',
    });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._favoriteService.findOne(id);
  }

  @Get('user/:id')
  async getUserFavorites(
    @Param('id') id: string,
    @GetUser() user,
    @Body() body: any,
  ) {
    console.log('user es en controller', user);
    return await this._favoriteService.findUserFavorites(id, '');
  }

  //@UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() _favoritesDto: favoriteDto) {
    _favoritesDto.created_at = new dateCreate().sysdate;
    _favoritesDto.updated_at = _favoritesDto.created_at;
    return this._favoriteService.create(_favoritesDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() _favoritesDto: favoriteDto) {
    return this._favoriteService.update(id, _favoritesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._favoriteService.remove(id);
  }
}
