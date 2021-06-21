import { RolApps } from './../../global/entities/rolapps.entity';
import { SubmenuGet } from './../submenus/entities/submenuget.entity';
import { SubmenuService } from './../submenus/services/submenu.service';
import { Submenu } from './../submenus/entities/submenu.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectRolSubmenu } from 'src/global/entities/projectrolessubmenus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Submenu, ProjectRolSubmenu, RolApps]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, SubmenuService],
})
export class ProjectsModule {}
