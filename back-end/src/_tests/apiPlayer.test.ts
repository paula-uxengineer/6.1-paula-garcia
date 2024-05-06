import request from 'supertest';
import { PrismaClient } from '../../prisma/generator/client';
import { Server } from '../frameworks/server/server';

const server = new Server(3400);
const prisma = new PrismaClient();

beforeAll(() => {
  server.listen();
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

describe('Player Test', () => {
  it('should register a player', async () => {
    const response = await request(server.app).post('/players').send({ name: 'TestPlayer' });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'TestPlayer');
  });

  it('should update player name', async () => {
    const createResponse = await request(server.app).post('/players').send({ name: 'TestPlayer' });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty('id');

    const playerId = createResponse.body.id;

    const updateResponse = await request(server.app)
      .put(`/players/${playerId}`)
      .send({ name: 'UpdatedName' });

    expect(updateResponse.status).toBe(200);

    expect(updateResponse.body).toHaveProperty('id', playerId);
    expect(updateResponse.body).toHaveProperty('name', 'UpdatedName');
  });

  it('should get player throws and success rate', async () => {
    const player1 = await request(server.app).post('/players').send({ name: 'Player1' });

    await request(server.app).post(`/players/${player1.body.id}/throws`).send({ winner: true });
    await request(server.app).post(`/players/${player1.body.id}/throws`).send({ winner: false });

    const response1 = await request(server.app).get(`/players/${player1.body.id}`).send();

    expect(response1.status).toBe(200);

    expect(response1.body).toHaveProperty('players');
    expect(response1.body).toHaveProperty('successRates');

    expect(Array.isArray(response1.body.players)).toBe(true);
    expect(response1.body.players.length).toBe(1);
    expect(response1.body.players[0].name).toBe('Player1');
  });
});
