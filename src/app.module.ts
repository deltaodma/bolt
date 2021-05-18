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
@Module({
  imports: [
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bolt', */
    //entities: ['dist/**/*.entity{.ts,.js}'],
    //synchronize: false,
    //retryDelay: 3000,
    //retryAttempts: 10,
    //}),
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
