import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo-endpoint')
  getNewEndpoint(): string {
    return 'Soy un nuevo endpoint';
  }

  // @Get('products')
  // getProducts(): number[] {
  //   return [1,2,3];
  // }

  // @Get('products/filter')
  // findAll(@Query() paginationQuery: any) {
  //   const { limit, offset } = paginationQuery;
  //   return `This action returns all products. Limit ${limit}, offset: ${offset}`;
  // }

  // @Get('products/:id')
  // getProduct(@Param('id') id: string) {
  //   return id;
  // }
  

  // @Get('categories')
  // getCategories(): number[] {
  //   return [4,5,6];
  // }

  // @Get('categories/:id')
  // getCategory(@Param('id') id: string) {
  //   return id;
  // }
}