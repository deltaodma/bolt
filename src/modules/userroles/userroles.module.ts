import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from './services/userrole.service';
import { UserRoleController } from './controllers/userrole.controller';
import { UserRoles } from './entities/userrole.entity';
import { UserService } from './../user/services/user.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles, User])],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserService],
})
export class UserrolesModule {}
