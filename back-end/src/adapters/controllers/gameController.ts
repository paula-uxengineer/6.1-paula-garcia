import { Request, Response } from 'express';
import { GameUseCase } from '../../application/usecases/gameUseCase';

export class GameController {
  constructor(private throwUseCase: GameUseCase) {}

  async createThrow(req: Request, res: Response): Promise<void> {
    try {
      const { playerId, dice1, dice2, winner } = req.body;
      const createdThrow = await this.throwUseCase.createThrow(playerId, dice1, dice2, winner);
      res.status(201).json(createdThrow);
    } catch (error) {
      console.error('Error creating throw:', error);
      res.status(500).json({ error: 'Error creating throw' });
    }
  }

  async deleteThrows(req: Request, res: Response): Promise<void> {
    try {
      const { playerId } = req.params;
      await this.throwUseCase.deleteThrows(parseInt(playerId));
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting throws:', error);
      res.status(500).json({ error: 'Error deleting throws' });
    }
  }

  async findThrowByPlayerId(req: Request, res: Response): Promise<void> {
    try {
      const { playerId } = req.params;
      const throws = await this.throwUseCase.findThrowByPlayerId(parseInt(playerId));
      res.status(200).json(throws);
    } catch (error) {
      console.error('Error finding throw by player id:', error);
      res.status(500).json({ error: 'Error finding throw by player id' });
    }
  }
}
