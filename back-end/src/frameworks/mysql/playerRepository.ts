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

// const player = {
//   id: 5,
//   name: 'Homer Simpson',
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
//   .createPlayer(player)
//   .then((result) => {
//     console.log('Player:', result);
//   })
//   .catch((error) => {
//     console.error('Error player::', error);
//   });
