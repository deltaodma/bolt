import { ProjectRoleController } from './controllers/projectrole.controller';
import { ProjectRoleService } from './services/projectroles.service';
import { ProjectRole } from './entities/projectroles.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRole])],
  controllers: [ProjectRoleController],
  providers: [ProjectRoleService],
})
export class ProjectrolesModule {}
