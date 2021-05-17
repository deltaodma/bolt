import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/apps.entity';
import { AppsController } from './controllers/apps.controller';
import { AppsService } from './services/apps.service';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
