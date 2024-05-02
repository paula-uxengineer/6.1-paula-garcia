import { PrismaClient } from '@prisma/client';
import { IPlayer } from '../../core/entities/iPlayer';
import { IThrow } from 'core/entities/iThrow';
import { IPlayerRepository } from '../../core/repositories/iPlayerRepository';

const prisma = new PrismaClient();

export class PlayerRepository implements IPlayerRepository {
  async createPlayer(player: IPlayer): Promise<IPlayer> {
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

  async registerPlayer(name: string): Promise<IPlayer> {
    console.log('nn', name);
    return await prisma.player.create({
      data: {
        name: name || 'ANONIMOUS'
      }
    });
  }

  async updatePlayerName(id: number, name: string): Promise<IPlayer | null> {
    try {
      const updatedPlayer = await prisma.player.update({
        where: { id },
        data: {
          name: name
        }
      });
      return updatedPlayer;
    } catch (error) {
      console.error('Error updating player:', error);
      throw new Error('Error updating player');
    }
  }

  async findAllPlayers(): Promise<IPlayer[]> {
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

  async deletePlayer(id: number): Promise<boolean> {
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

const player = {
  id: 1,
  name: 'Jugador1',
  creationDate: new Date('2024-04-30'),
  successRate: 0.75,
  throws: [
    { id: 1, dice1: 4, dice2: 3, winner: true },
    { id: 2, dice1: 2, dice2: 3, winner: false },
    { id: 1, dice1: 1, dice2: 3, winner: false }
  ]
};

const playerRepo = new PlayerRepository();
playerRepo
  .createPlayer(player)
  .then((result) => {
    console.log('Jugador creado:', result);
  })
  .catch((error) => {
    console.error('Error al crear jugador:', error);
  });
