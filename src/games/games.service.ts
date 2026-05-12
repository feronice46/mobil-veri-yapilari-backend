import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  // CREATE - Yeni oyun ekle
  async create(dto: CreateGameDto): Promise<Game> {
    const game = this.gamesRepository.create(dto);
    return this.gamesRepository.save(game);
  }

  // READ - Tüm oyunları listele
  async findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  // READ - Tek bir oyunu getir
  async findOne(id: number): Promise<Game> {
    const game = await this.gamesRepository.findOneBy({ id });
    if (!game) throw new NotFoundException(`Oyun ${id} bulunamadı`);
    return game;
  }

  // UPDATE - Oyun güncelle
  async update(id: number, dto: Partial<CreateGameDto>): Promise<Game> {
    await this.gamesRepository.update(id, dto);
    return this.findOne(id);
  }

  // DELETE - Oyun sil
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.gamesRepository.delete(id);
  }
}