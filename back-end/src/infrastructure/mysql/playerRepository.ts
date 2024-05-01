import { PrismaClient } from '@prisma/client';
import { IPlayer } from '../../core/entities/iPlayer';
import { IPlayerRepository } from '../../core/repositories/iPlayerRepository';

const prisma = new PrismaClient();

export class PlayerRepository implements IPlayerRepository {
  async create(player: IPlayer): Promise<IPlayer> {
    try {
      const createdPlayer = await prisma.player.create({
        data: {
          name: player.name || 'ANONIMOUS',
          creationDate: player.creationDate,
          successRate: player.successRate,
          throws: {
            create: player.throws || []
          }
        },
        include: {
          throws: true
        }
      });
      return createdPlayer;
    } catch (error) {
      console.error('Error creating player:', error);
      throw new Error('Error creating player');
    }
  }

  async findAll(): Promise<IPlayer[]> {
    try {
      return await prisma.player.findMany({
        include: {
          throws: true
        }
      });
    } catch (error) {
      console.error('Error finding all players:', error);
      throw new Error('Error finding all players');
    }
  }

  async findById(id: number): Promise<IPlayer | null> {
    try {
      return await prisma.player.findUnique({
        where: { id },
        include: {
          throws: true
        }
      });
    } catch (error) {
      console.error('Error finding player by id:', error);
      throw new Error('Error finding player by id');
    }
  }

  async update(id: number, player: Partial<IPlayer>): Promise<IPlayer | null> {
    try {
      const updatedPlayer = await prisma.player.update({
        where: { id },
        data: {
          name: player.name,
          successRate: player.successRate,
          throws: {
            create: player.throws || []
          }
        },
        include: {
          throws: true
        }
      });
      return updatedPlayer;
    } catch (error) {
      console.error('Error updating player:', error);
      throw new Error('Error updating player');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.player.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting player:', error);
      throw new Error('Error deleting player');
    }
  }
}
