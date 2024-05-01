import { PrismaClient } from '@prisma/client';
import { IThrow } from '../../core/entities/iThrow';
import { IGameRepository } from 'core/repositories/iGameRepository';

const prisma = new PrismaClient();

export class GameRepository implements IGameRepository {
  async createThrow(
    playerId: number,
    dice1: number,
    dice2: number,
    winner: boolean
  ): Promise<IThrow> {
    try {
      return await prisma.throw.create({
        data: {
          playerId,
          dice1,
          dice2,
          winner
        }
      });
    } catch (error) {
      console.error('Error creating throw:', error);
      throw new Error('Error creating throw');
    }
  }

  async deleteThrows(playerId: number): Promise<void> {
    try {
      await prisma.throw.deleteMany({
        where: { playerId }
      });
    } catch (error) {
      console.error('Error deleting throws:', error);
      throw new Error('Error deleting throws');
    }
  }

  async findByPlayerId(playerId: number): Promise<IThrow[]> {
    try {
      return await prisma.throw.findMany({
        where: { playerId }
      });
    } catch (error) {
      console.error('Error finding throws by player id:', error);
      throw new Error('Error finding throws by player id');
    }
  }

  async deleteThrowsByPlayerId(playerId: number): Promise<void> {
    try {
      await prisma.throw.deleteMany({
        where: { playerId }
      });
    } catch (error) {
      console.error('Error deleting throws by player id:', error);
      throw new Error('Error deleting throws by player id');
    }
  }
}
