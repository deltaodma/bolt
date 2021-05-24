import { Archivo } from './../../global/entities/archivos.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { BannersController } from './controllers/banners.controller';
import { BannersService } from './services/banners.service';
import { ArchivoService } from './../../global/services/archivos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Archivo])],
  controllers: [BannersController],
  providers: [BannersService, ArchivoService],
})
export class BannersModule {}
