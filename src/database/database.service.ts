import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from './../config/configuration.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'mysql' as 'mysql',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.DB_USER),
        port: parseInt(config.get(Configuration.DB_PORT)),
        database: config.get(Configuration.DB_NAME),
        password: config.get(Configuration.DB_PASSWORD),
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
