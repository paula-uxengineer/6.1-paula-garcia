import request from 'supertest';
import { Player, PrismaClient } from '../../prisma/generator/client';
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

  it('GET /players should return players throws and success rates', async () => {
    //create some players
    const batchPayload = await prisma.player.createMany({
      data: [{ name: 'Jugador 1' }, { name: 'Jugador 2' }]
    });

    const playersData = await prisma.player.findMany();

    const response = await request(app).get(`/players`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('players');
    expect(response.body.players).toHaveLength(playersData.length);
  });
});
