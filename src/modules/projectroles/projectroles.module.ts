import { Role } from './../roles/entities/roles.entity';
import { RolesService } from './../roles/services/roles.service';
import { ProjectRoleController } from './controllers/projectrole.controller';
import { ProjectRoleService } from './services/projectroles.service';
import { ProjectRole } from './entities/projectroles.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRoleSubmenu } from './../../global/entities/projectrolessubmenus.entity';
import { RolApps } from './../../global/entities/rolapps.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectRole, Role, ProjectRoleSubmenu, RolApps]),
  ],
  controllers: [ProjectRoleController],
  providers: [ProjectRoleService, RolesService],
})
export class ProjectrolesModule {}
