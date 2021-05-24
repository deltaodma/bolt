import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submenu } from './entities/submenu.entity';
import { SubmenuController } from './controllers/submenu.controller';
import { SubmenuService } from './services/submenu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Submenu])],
  controllers: [SubmenuController],
  providers: [SubmenuService],
})
export class SubmenusModule {}
