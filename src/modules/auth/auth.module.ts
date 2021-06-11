import { RolApps } from './../../global/entities/rolapps.entity';
import { ProjectRolSubmenu } from './../../global/entities/projectrolessubmenus.entity';
import { UserService } from './../user/services/user.service';
import { Submenu } from './../submenus/entities/submenu.entity';
import { Project } from './../projects/entities/projects.entity';
import { SubmenuService } from './../submenus/services/submenu.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Saml2Strategy } from './strategies/saml.strategy';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from './../user/entities/user.entity';
import { jwtConstants } from './constants';
import { SessionSerializer } from './session.serializer';
import { ProjectsService } from './../projects/services/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Project,
      Submenu,
      ProjectRolSubmenu,
      RolApps,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    Saml2Strategy,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
    ProjectsService,
    SubmenuService,
    UserService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
