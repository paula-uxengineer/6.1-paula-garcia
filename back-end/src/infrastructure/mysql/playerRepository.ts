import { PrismaClient } from '@prisma/client';
import { IPlayer } from '../../core/entities/iPlayer';
import { IPlayerRepository } from '../../core/repositories/iPlayerRepository';
import { IThrow } from 'core/entities/iThrow';

const prisma = new PrismaClient();

export class PlayerRepository implements IPlayerRepository {
  async createPlayer(player: IPlayer): Promise<IPlayer> {
    try {
      const createPlayer = await prisma.player.create({
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
      console.error('Error creating player:', error);
      throw new Error('Error creating player');
    }
  }

  async registerPlayer(name: string): Promise<IPlayer> {
    console.log('name player:', name);
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

  async getPlayerThrows(playerId: number): Promise<{ throws: IThrow[]; successRate: number }> {
    try {
      const player = await prisma.player.findUnique({
        where: { id: playerId },
        include: { throws: true }
      });

      if (!player) {
        throw new Error('Player not founded.');
      }

      const throws = player.throws;
      const totalThrows = throws.length;
      let totalWins = 0;

      // total win throws
      throws.forEach((throwItem) => {
        if (throwItem.winner) {
          totalWins++;
        }
      });

      // successRate:
      const successRate = totalThrows > 0 ? (totalWins / totalThrows) * 100 : 0;

      // round decimals to 00.00
      const roundedSuccessRate = Math.round(successRate * 100) / 100;

      return { throws, successRate: roundedSuccessRate };
    } catch (error) {
      console.error('Error fetching player throws:', error);
      throw new Error('Error fetching player throws');
    }
  }
}

// const player = {
//   id: 5,
//   name: 'Jugador1',
//   creationDate: new Date('2024-04-30'),
//   successRate: 0.75,
//   throws: [
//     { id: 10, dice1: 4, dice2: 3, winner: true },
//     { id: 20, dice1: 2, dice2: 3, winner: false },
//     { id: 30, dice1: 1, dice2: 3, winner: false }
//   ]
// };

// const playerRepo = new PlayerRepository();
// playerRepo
//   .getPlayerThrows(5)
//   .then((result) => {
//     console.log('Players', result);
//   })
//   .catch((error) => {
//     console.error('Error al players:', error);
//   });

const player = {
  id: 5,
  name: 'Jugador1',
  creationDate: new Date('2024-04-30'),
  successRate: 0.75,
  throws: [
    { id: 10, dice1: 4, dice2: 3, winner: true },
    { id: 20, dice1: 2, dice2: 3, winner: false },
    { id: 30, dice1: 1, dice2: 3, winner: false }
  ]
};

const playerRepo = new PlayerRepository();
playerRepo
  .registerPlayer('')
  .then((result) => {
    console.log('Player:', result);
  })
  .catch((error) => {
    console.error('Error player::', error);
  });
