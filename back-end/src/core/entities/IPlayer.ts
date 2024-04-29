import { Throw } from '@prisma/client';
export interface IPlayer {
  id: number;
  name: string;
  creationDate: Date;
  throws: Partial<Throw>[];
}
