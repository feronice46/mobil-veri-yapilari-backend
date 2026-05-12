import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  // CREATE - Yeni oyuncu kaydetme
  async create(dto: CreatePlayerDto): Promise<Player> {
    const player = this.playersRepository.create(dto);
    return this.playersRepository.save(player);
  }

  // READ - Tüm oyuncuları listeleme
  async findAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  // READ - Tek bir oyuncuyu ID ile getirme
  async findOne(id: number): Promise<Player> {
    const player = await this.playersRepository.findOneBy({ id });
    if (!player) throw new NotFoundException(`Oyuncu ${id} bulunamadı`);
    return player;
  }

  // UPDATE - Oyuncu bilgilerini güncelleme
  async update(id: number, dto: Partial<CreatePlayerDto>): Promise<Player> {
    await this.playersRepository.update(id, dto);
    return this.findOne(id);
  }

  // DELETE - Oyuncuyu silme
  async remove(id: number): Promise<void> {
    await this.findOne(id);  // Önce var mı diye kontrol ediyoruz
    await this.playersRepository.delete(id);
  }
}