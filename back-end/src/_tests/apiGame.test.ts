import request from 'supertest';
import { PrismaClient } from '../../prisma/generator/client';
import { Server } from '../frameworks/server/server';

const app = new Server(3400).app;
const prisma = new PrismaClient();

describe('Test API/games', () => {
  beforeAll(() => {
    app.listen();
  });
  afterAll(async () => {
    try {
      await prisma.throw.deleteMany();
      await prisma.player.deleteMany();
    } catch (error) {
      console.error('Error to delete models', error);
    } finally {
      await prisma.$disconnect();
    }
  });
  // it('should create a new throw', async () => {
  //   const playerId = 1;
  //   const dice1 = 4;
  //   const dice2 = 6;
  //   const winner = true;

  //   const response = await request(app)
  //     .post(`/games/${playerId}`)
  //     .send({ dice1, dice2, winner })
  //     .expect('Content-Type', /json/)
  //     .expect(201);

  //   expect(response.body.message).toEqual('Throw created successfully');

  //   const player = await prisma.player.findUnique({
  //     where: { id: playerId },
  //     include: { throws: true }
  //   });
  //   expect(player.throws.length).toEqual(1);
  // });

  it('should delete throws for a player', async () => {
    const createPlayer = await prisma.player.create({
      data: {
        name: 'TestPlayer',
        throws: {
          create: [
            { dice1: 1, dice2: 2, winner: true },
            { dice1: 3, dice2: 4, winner: false }
          ]
        }
      },
      include: {
        throws: true
      }
    });
    const idPlayer = createPlayer.id;

    const response = await request(app).delete(`/games/${idPlayer}`).expect(204);

    const throwsAfterDeletion = await prisma.throw.findMany({
      where: { playerId: idPlayer }
    });

    expect(throwsAfterDeletion).toHaveLength(0);
  });

  it('should get throws for a player', async () => {
    const player = await prisma.player.create({
      data: {
        name: 'TestPlayer',
        throws: {
          create: [
            { dice1: 1, dice2: 2, winner: true },
            { dice1: 3, dice2: 4, winner: false }
          ]
        }
      }
    });

    const idPlayer = player.id;

    const response = await request(app).get(`/games/${idPlayer}`).expect(200);

    expect(response.body.message).toBe('Throws by player');
    expect(response.body.data.length).toBe(2);
  });
});
