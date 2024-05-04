import { PlayerRepository } from '../../infrastructure/mysql/playerRepository';
import { Player, PrismaClient } from '../../../prisma/generator/client';
import { IPlayer } from 'core/entities/iPlayer';
import { IThrow } from 'core/entities/iThrow';

// Mock Prisma Client
jest.mock('../../../prisma/generator/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      player: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn()
      },
      throw: {
        findMany: jest.fn()
      }
    }))
  };
});

describe('PlayerRepository', () => {
  let playerRepository: PlayerRepository;
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    playerRepository = new PlayerRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a player', async () => {
    const player: IPlayer = {
      id: 1,
      name: 'Homer Simpson',
      creationDate: new Date(),
      successRate: 0.5,
      throws: []
    };

    // // mock of method createPlayer
    (prismaClient.player.create as jest.Mock).mockResolvedValueOnce(player);

    const createdPlayer = await playerRepository.createPlayer(player);

    expect(createdPlayer).toEqual(player);
    expect(prismaClient.player.create).toHaveBeenCalledWith({
      data: {
        name: player.name,
        creationDate: player.creationDate,
        successRate: player.successRate,
        throws: {
          create: []
        }
      },
      include: {
        throws: true
      }
    });
  });

  it('should register a player', async () => {
    const name = 'Homer Simpson';

    const createdPlayerData: IPlayer = {
      id: 1,
      name,
      creationDate: expect.any(Date)
    };

    // mock of method createPlayer
    (prismaClient.player.create as jest.Mock).mockResolvedValueOnce(createdPlayerData);

    const createdPlayer = await playerRepository.registerPlayer(name);

    expect(createdPlayer).toEqual(createdPlayerData);
    expect(prismaClient.player.create).toHaveBeenCalledWith({
      data: {
        name
      }
    });
  });

  it('should update a player name', async () => {
    const id = 1;
    const name = 'Bart Simpson';

    const updatedPlayerData: IPlayer = {
      id,
      name,
      creationDate: expect.any(Date)
    };

    // mock of method updatePlayer
    (prismaClient.player.update as jest.Mock).mockResolvedValueOnce(updatedPlayerData);

    const updatedPlayer = await playerRepository.updatePlayerName(id, name);

    expect(updatedPlayer).toEqual(updatedPlayerData);
    expect(prismaClient.player.update).toHaveBeenCalledWith({
      where: { id },
      data: { name }
    });
  });

  it('should find all players', async () => {
    const players: IPlayer[] = [
      {
        id: 1,
        name: 'Homer Simpson',
        creationDate: new Date(),
        throws: []
      },
      {
        id: 2,
        name: 'Marge Simpson',
        creationDate: new Date(),
        throws: []
      }
    ];

    // mock of method findMany
    (prismaClient.player.findMany as jest.Mock).mockResolvedValueOnce(players);

    const foundPlayers = await playerRepository.findAllPlayers();

    expect(foundPlayers).toEqual(players);
    expect(prismaClient.player.findMany).toHaveBeenCalled();
  });

  it('should find throws and success rate by player id', async () => {
    const playerId = 1;
    const throws: IThrow[] = [
      { id: 1, dice1: 1, dice2: 2, winner: true },
      { id: 2, dice1: 3, dice2: 4, winner: false }
    ];
    const successRate = 0.8;

    // mock of method findMany
    (prismaClient.throw.findMany as jest.Mock).mockResolvedValueOnce(throws);

    const foundThrowsAndSuccessRate =
      await playerRepository.findThrowsAndSuccessRateByPlayerId(playerId);

    expect(foundThrowsAndSuccessRate).toEqual({ throws, successRate });
    expect(prismaClient.throw.findMany).toHaveBeenCalledWith({
      where: { playerId }
    });
  });
});
