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
        host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        username: 'rl4t0ifoetjy1hwp',
        port: 3306,
        database: 'uii98fu77xic7lc8',
        password: 'ru59gknltb3gf3ep',
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
