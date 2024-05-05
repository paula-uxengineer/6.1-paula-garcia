import { PrismaClient } from '../../../prisma/generator/client';
import { IThrow } from '../../core/entities/iThrow';
import { IGameRepository } from 'core/gateaway/iGameRepository';

const prisma = new PrismaClient();

export class GameRepository implements IGameRepository {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createThrow(
    playerId: number,
    dice1: number,
    dice2: number,
    winner: boolean
  ): Promise<IThrow> {
    try {
      const throws = await prisma.throw.create({
        data: {
          playerId,
          dice1,
          dice2,
          winner
        }
      });
      console.log('Throws:');
      console.table(throws);
      return throws;
    } catch (error) {
      console.error('Error creating throw:', error);
      throw new Error('Error creating throw');
    }
  }

  async deleteThrows(playerId: number): Promise<void> {
    try {
      const throws = await prisma.throw.deleteMany({
        where: { playerId }
      });
      console.log('Throws:', throws);
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
      console.log('Throws player:', player.id);
      console.dir(player.throws);
      return player.throws || [];
    } catch (error) {
      console.error('Error finding throws by player id:', error);
      throw new Error('Error finding throws by player id');
    }
  }
}

const gameRepo = new GameRepository();

// gameRepo.findThrowByPlayerId(1).then((throws) => {
//   console.log('Lanzamientos:', throws);
// });

// gameRepo.deleteThrows(1).then((throws) => {
//   console.log('Throws deleted', throws);
// });

// gameRepo.createThrow(1, 4, 7, true).then((throws) => {
//   console.log('Lanzamientos:', throws);
// });
