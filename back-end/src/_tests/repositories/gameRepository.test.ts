import { GameRepository } from '../../infrastructure/mysql/gameRepository';
import { PrismaClient } from '../../../prisma/generator/client';
import { IThrow } from '../../core/entities/iThrow';

// Mock Prisma Client
jest.mock('../../../prisma/generator/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      throw: {
        create: jest.fn(),
        deleteMany: jest.fn(),
        findMany: jest.fn()
      },
      player: {
        findUnique: jest.fn()
      }
    }))
  };
});

describe('GameRepository', () => {
  let gameRepository: GameRepository;
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    gameRepository = new GameRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a throw', async () => {
    const playerId = 1;
    const dice1 = 4;
    const dice2 = 3;
    const winner = true;

    const createdThrowData = {
      playerId,
      dice1,
      dice2,
      winner
    };

    // mock of method create
    (prismaClient.throw.create as jest.Mock).mockResolvedValueOnce(createdThrowData as IThrow);

    const createdThrow = await gameRepository.createThrow(playerId, dice1, dice2, winner);

    expect(createdThrow).toEqual(createdThrowData);
    expect(prismaClient.throw.create).toHaveBeenCalledWith({
      data: createdThrowData
    });
  });

  it('should delete throws', async () => {
    const playerId = 1;

    // mock of method deleteMany
    (prismaClient.throw.deleteMany as jest.Mock).mockResolvedValueOnce(undefined);

    await gameRepository.deleteThrows(playerId);

    expect(prismaClient.throw.deleteMany).toHaveBeenCalledWith({
      where: { playerId }
    });
  });

  it('should find throws by player id', async () => {
    const playerId = 1;
    const throwsData: IThrow[] = [{ id: 1, playerId: 1, dice1: 4, dice2: 3, winner: true }];

    // mock of methos findUnique
    (prismaClient.player.findUnique as jest.Mock).mockResolvedValueOnce({
      throws: throwsData
    });

    const throws = await gameRepository.findThrowByPlayerId(playerId);

    expect(throws).toEqual(throwsData);
    expect(prismaClient.player.findUnique).toHaveBeenCalledWith({
      where: { id: playerId },
      include: { throws: true }
    });
  });
});
