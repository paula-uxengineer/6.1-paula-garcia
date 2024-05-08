import { IPlayer } from 'core/entities/iPlayer';
import { PrismaClient } from '../../../prisma/generator/client';
import { IThrow } from '../../core/entities/iThrow';
import { IGameRepository } from 'core/gateaway/iGameRepository';

const prisma = new PrismaClient();

export class GameRepository implements IGameRepository {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createThrow(playerId: number): Promise<void> {
    try {
      const dice1 = Math.floor(Math.random() * 6);
      const dice2 = Math.floor(Math.random() * 6);
      const winner = dice1 + dice2 == 7 ? true : false;

      const createdThrow = await prisma.throw.create({
        data: {
          dice1: dice1,
          dice2: dice2,
          winner: winner,
          playerId: playerId
        }
      });
      console.log('Throw created successfully:', createdThrow);
    } catch (error) {
      console.error('Error creating throw:', error);
      throw new Error('Error creating throw');
    }
  }

  async deleteThrows(playerId: number): Promise<void> {
    try {
      const deletedThrows = await this.prisma.throw.deleteMany({
        where: { playerId }
      });
    } catch (error) {
      console.error('Error deleting throws:', error);
      throw new Error('Error deleting throws');
    }
  }

  async findThrowByPlayerId(playerId: number): Promise<IThrow[]> {
    try {
      const player = await prisma.player.findUnique({
        where: { id: playerId },
        include: { throws: true }
      });

      if (!player) {
        throw new Error('Player not found');
      }
      return player.throws || [];
    } catch (error) {
      console.error('Error finding throws by player id:', error);
      throw new Error('Error finding throws by player id');
    }
  }
}
