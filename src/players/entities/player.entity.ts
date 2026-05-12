import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { GameSession } from '../../game-sessions/entities/game-session.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  level: number;

  // Hocanın notlarındaki eksik olan bakiye sütununu ekledik
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => GameSession, session => session.player)
  sessions: GameSession[];
}