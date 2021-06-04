import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BannersModule } from './modules/banners/banners.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AppsModule } from './modules/apps/apps.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/configuration.keys';
import { DatabaseModule } from './database/database.module';
import { TypesModule } from './modules/types/types.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserrolesModule } from './modules/userroles/userroles.module';
import { SubmenusModule } from './modules/submenus/submenus.module';
import { ProjectrolesModule } from './modules/projectroles/projectroles.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'), // <-- path to the static files
    }),

    BannersModule,
    ProjectsModule,
    AppsModule,
    ConfigModule,
    DatabaseModule,
    TypesModule,
    AuthModule,
    UserModule,
    RolesModule,
    UserrolesModule,
    SubmenusModule,
    ProjectrolesModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
