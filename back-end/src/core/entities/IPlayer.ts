import { IThrow } from './iThrow';
export interface IPlayer {
  id: number;
  name: string;
  creationDate: Date;
  successRate?: number | null;
  throws?: IThrow[];
}
