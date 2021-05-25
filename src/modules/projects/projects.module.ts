import { SubmenuService } from './../submenus/services/submenu.service';
import { Submenu } from './../submenus/entities/submenu.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Submenu])],
  controllers: [ProjectsController],
  providers: [ProjectsService, SubmenuService],
})
export class ProjectsModule {}
