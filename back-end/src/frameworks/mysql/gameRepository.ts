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

  async createThrow(
    playerId: number,
    dice1: number,
    dice2: number,
    winner: boolean
  ): Promise<void> {
    try {
      const existingPlayer = await prisma.player.findUnique({
        where: { id: playerId },
        include: { throws: true }
      });

      if (!existingPlayer) {
        throw new Error('Player does not exist');
      }

      const createdThrow = await prisma.throw.create({
        data: {
          dice1,
          dice2,
          winner,
          player: { connect: { id: playerId } }
        }
      });

      const currentThrows: IThrow[] = existingPlayer.throws;

      const updatedThrows: IThrow[] = [...currentThrows, createdThrow];

      const updatedPlayer = await prisma.player.update({
        where: { id: playerId },
        data: { throws: { set: updatedThrows } }
      });

      console.log('Throw created successfully on database:', createdThrow);
    } catch (error) {
      console.error('Error creating throw on database:', error);
      throw new Error('Error creating throw on database');
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

//const gameRepo = new GameRepository();

// gameRepo.findThrowByPlayerId(1).then((throws) => {
//   console.log('Lanzamientos:', throws);
// });

// gameRepo.deleteThrows(1).then((throws) => {
//   console.log('Throws deleted', throws);
// });

// gameRepo.createThrow(1, 4, 7, true).then((throws) => {
//   console.log('Lanzamientos:', throws);
// });
