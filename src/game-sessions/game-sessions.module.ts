import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSessionsService } from './game-sessions.service';
import { GameSessionsController } from './game-sessions.controller';
import { GameSession } from './entities/game-session.entity';
import { Player } from '../players/entities/player.entity';
import { Game } from '../games/entities/game.entity';

@Module({// imports kısmına Player ve Game varlıklarını da ekliyoruz
  imports: [TypeOrmModule.forFeature([GameSession, Player, Game])],
  controllers: [GameSessionsController],
  providers: [GameSessionsService],
  exports: [GameSessionsService],
})
export class GameSessionsModule {}