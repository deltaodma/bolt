import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from './../config/configuration.keys';
import * as dotenv from 'dotenv';
const globalVars = dotenv.config();

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'mysql' as 'mysql',
        host: 'localhost',
        username: 'root',
        port: 3306,
        database: 'bolt',
        password: '',
        //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: ['dist/**/*.entity{.ts,.js}'],
        //migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
        retryDelay: 3000,
        retryAttempts: 10,
      } as ConnectionOptions;
    },
  }),
];
