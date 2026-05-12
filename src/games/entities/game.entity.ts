import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GameSession } from '../../game-sessions/entities/game-session.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  genre: string;

  @OneToMany(() => GameSession, session => session.game)
  sessions: GameSession[];
}