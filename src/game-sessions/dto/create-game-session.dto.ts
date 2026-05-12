import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateGameSessionDto {
  @IsNumber()
  @IsNotEmpty()
  playerId: number; // Hangi oyuncu oynuyor?

  @IsNumber()
  @IsNotEmpty()
  gameId: number; // Hangi oyunu oynuyor?

  @IsNumber()
  @IsOptional()
  score?: number;
}