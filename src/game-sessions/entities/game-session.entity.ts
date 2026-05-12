import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Game } from '../../games/entities/game.entity';

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  score: number;

  @CreateDateColumn()
  startedAt: Date;

  @ManyToOne(() => Player, player => player.sessions)
  player: Player; // FK: Hangi oyuncu oynuyor? 

  @ManyToOne(() => Game, game => game.sessions)
  game: Game; // FK: Hangi oyunu oynuyor? 
}