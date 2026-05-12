import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSession } from './entities/game-session.entity';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { Player } from '../players/entities/player.entity';
import { Game } from '../games/entities/game.entity';

@Injectable()
export class GameSessionsService {
  constructor(
    @InjectRepository(GameSession)
    private gameSessionsRepository: Repository<GameSession>,
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(dto: CreateGameSessionDto): Promise<GameSession> {
    const player = await this.playersRepository.findOneBy({ id: dto.playerId });
    if (!player) throw new NotFoundException(`Oyuncu ID ${dto.playerId} bulunamadı`);

    const game = await this.gamesRepository.findOneBy({ id: dto.gameId });
    if (!game) throw new NotFoundException(`Oyun ID ${dto.gameId} bulunamadı`);

    const session = this.gameSessionsRepository.create({
      score: dto.score || 0,
      player: player,
      game: game,
    });

    return this.gameSessionsRepository.save(session);
  }

  async findAll(): Promise<GameSession[]> {
    return this.gameSessionsRepository.find({ relations: ['player', 'game'] });
  }

  async findOne(id: number): Promise<GameSession> {
    const session = await this.gameSessionsRepository.findOne({
      where: { id },
      relations: ['player', 'game'],
    });
    if (!session) throw new NotFoundException(`Oyun Oturumu ${id} bulunamadı`);
    return session;
  }

  async update(id: number, score: number): Promise<GameSession> {
    const session = await this.findOne(id);
    session.score = score;
    return this.gameSessionsRepository.save(session);
  }

  async remove(id: number): Promise<void> {
    const session = await this.findOne(id);
    await this.gameSessionsRepository.remove(session);
  }
}