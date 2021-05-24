import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from './controllers/favorites.controller';
import { FavoriteService } from './services/favorites.service';
import { Favorite } from './entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoriteService],
})
export class FavoritesModule {}
