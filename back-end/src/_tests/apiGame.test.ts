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

describe('Game Test', () => {
  it('should create a throw', async () => {
    const response = await request(server.app)
      .post('/games/throws')
      .send({ playerId: 1, dice1: 4, dice2: 7, winner: true });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('playerId', 1);
    expect(response.body).toHaveProperty('dice1', 4);
    expect(response.body).toHaveProperty('dice2', 7);
    expect(response.body).toHaveProperty('winner', true);
  });

  it('should delete throws by player ID', async () => {
    const playerId = 1; // Supongamos que existe un jugador con ID 1
    const response = await request(server.app).delete(`/games/throws/${playerId}`);

    expect(response.status).toBe(204);
  });

  it('should find throws by player ID', async () => {
    const playerId = 1; // Supongamos que existe un jugador con ID 1
    const response = await request(server.app).get(`/games/throws/${playerId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Aquí puedes agregar más expectativas según la estructura de la respuesta
  });
});
