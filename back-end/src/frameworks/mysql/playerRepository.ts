import { PrismaClient } from '../../../prisma/generator/client';
import { IPlayer } from '../../core/entities/iPlayer';
import { IPlayerRepository } from '../../core/gateaway/iPlayerRepository';

export class PlayerRepository implements IPlayerRepository {
  prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPlayer(player: IPlayer): Promise<IPlayer> {
    try {
      const createPlayer = await this.prisma.player.create({
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
      return createPlayer;
    } catch (error) {
      console.error('Error creating player on database:', error);
      throw new Error('Error creating player on database');
    }
  }

  async registerPlayer(name: string): Promise<IPlayer> {
    return await this.prisma.player.create({
      data: {
        name: name || 'ANONIMOUS'
      },
      include: {
        throws: true
      }
    });
  }

  async updatePlayerName(id: number, name: string): Promise<IPlayer | null> {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: {
          name: name
        },
        include: {
          throws: true
        }
      });
      return updatedPlayer;
    } catch (error) {
      console.error('Error updating player on database:', error);
      throw new Error('Error updating player on database');
    }
  }

  async findAllPlayers(): Promise<IPlayer[]> {
    try {
      return await this.prisma.player.findMany({
        include: {
          throws: true
        }
      });
    } catch (error) {
      console.error('Error finding all players: on database', error);
      throw new Error('Error finding all players on database');
    }
  }

  async deleteAllPlayers(): Promise<void> {
    try {
      await this.prisma.throw.deleteMany();

      await this.prisma.player.deleteMany();
    } catch (error) {
      console.error('Error deleting all players on database:', error);
      throw new Error('Error deleting all players on database');
    }
  }
}
