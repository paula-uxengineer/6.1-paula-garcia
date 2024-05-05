import { PrismaClient } from '../../../prisma/generator/client';
import { IPlayer } from '../../core/entities/iPlayer';
import { IPlayerRepository } from '../../core/gateaway/iPlayerRepository';
import { IThrow } from 'core/entities/iThrow';

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
    console.log('name player:', name);
    return await this.prisma.player.create({
      data: {
        name: name || 'ANONIMOUS'
      }
    });
  }

  async updatePlayerName(id: number, name: string): Promise<IPlayer | null> {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: {
          name: name
        }
      });
      console.log('update name: ', name);
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

  async findThrowsAndSuccessRateByPlayerId(
    playerId: number
  ): Promise<{ throws: IThrow[]; successRate: number }> {
    try {
      const playerThrows = await this.prisma.throw.findMany({
        where: {
          playerId: playerId // Filtrar por playerId específico
        }
      });

      const totalThrows = playerThrows.length;
      let totalWins = 0;

      // Calcular el número total de tiradas ganadoras
      playerThrows.forEach((throwItem) => {
        if (throwItem.winner) {
          totalWins++;
        }
      });

      // Calcular la tasa de éxito
      const successRate = totalThrows > 0 ? (totalWins / totalThrows) * 100 : 0;

      // Redondear la tasa de éxito a dos decimales
      const roundedSuccessRate = Math.round(successRate * 100) / 100;

      return { throws: playerThrows, successRate: roundedSuccessRate };
    } catch (error) {
      console.error('Error fetching player throws from the database:', error);
      throw new Error('Error fetching player throws from the database');
    }
  }

  async deleteAllPlayers(): Promise<void> {
    try {
      // Borra todos los jugadores y sus respectivas tiradas
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
