import request from 'supertest';
import { PrismaClient } from '../../prisma/generator/client';
import { Server } from '../frameworks/server/server';

const app = new Server(3200).app;
const prisma = new PrismaClient();

describe('Test API/players', () => {
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

  it('responds with JSON containing the registered player', async () => {
    const newPlayerName = 'TestPlayer';

    const response = await request(app)
      .post('/players')
      .send({ name: newPlayerName })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.message).toEqual('Player registered.');
    expect(response.body.player.name).toEqual(newPlayerName);
  });

  it('responds with JSON containing the updated player', async () => {
    const createPlayer = await prisma.player.create({
      data: {
        name: 'name'
      },
      include: {
        throws: true
      }
    });

    const playerId = createPlayer.id;

    const response = await request(app)
      .put(`/players/${playerId}`)
      .send({ name: 'UpdatedName' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toBe('New name: ');
    expect(response.body.updatedPlayer.name).toBe('UpdatedName');
  });

  it('responds with JSON containing throws and success rate', async () => {
    const playerId = 1;

    const response = await request(app).get(`/players/${playerId}`).expect(200);

    expect(response.body.message).toEqual('Average success rate : ');
    expect(response.body.players).toBeDefined();
    expect(response.body.averageSuccessRate).toBeDefined();
  });
});
