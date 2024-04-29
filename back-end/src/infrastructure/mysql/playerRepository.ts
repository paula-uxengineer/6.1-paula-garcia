import { PrismaClient } from '@prisma/client';
import { IPlayer } from '../../core/entities/IPlayer';

const prisma = new PrismaClient();

export const playerRepository = {
  async create(name: string): Promise<IPlayer> {
    return prisma.player.create({
      data: {
        name
      },
      include: {
        throws: true
      }
    });
  },

  async findById(id: number): Promise<IPlayer | null> {
    return prisma.player.findUnique({
      where: { id },
      include: {
        throws: true
      }
    });
  },

  async updateName(id: number, name: string): Promise<IPlayer | null> {
    return prisma.player.update({
      where: { id },
      data: { name },
      include: {
        throws: true
      }
    });
  },

  async deleteThrows(id: number): Promise<void> {
    await prisma.throw.deleteMany({
      where: { playerId: id }
    });
  },

  async findAll(): Promise<IPlayer[]> {
    return prisma.player.findMany({
      include: {
        throws: true
      }
    });
  }
};
