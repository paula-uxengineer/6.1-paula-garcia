import request from 'supertest';
import { PrismaClient } from '../../prisma/generator/client';
import { Server } from '../frameworks/server/server';

const app = new Server(3200).app;
const prisma = new PrismaClient();

describe('Test API/ranking', () => {
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

  it('should return ranking of all players', async () => {
    const response = await request(app).get('/ranking');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Ranking of all players: ');
    expect(response.body.ranking).toBeDefined();
  });

  it('should return the top loser player', async () => {
    const response = await request(app).get('/ranking/loser');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Top loser: ');
    expect(response.body.loser).toBeDefined();
  });

  it('should return the top winner player', async () => {
    const response = await request(app).get('/ranking/winner');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Top winner: ');
    expect(response.body.winner).toBeDefined();
  });

  it('should return the average success rate of all players', async () => {
    const response = await request(app).get('/ranking/average-success-rate');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Average success rate of all players: ');
    expect(response.body.averageSuccessRate).toBeDefined();
  });
});
