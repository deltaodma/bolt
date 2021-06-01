import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from './services/userrole.service';
import { UserRoleController } from './controllers/userrole.controller';
import { UserRoles } from './entities/userrole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserrolesModule {}
