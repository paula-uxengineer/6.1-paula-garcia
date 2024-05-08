import { Request, Response } from 'express';
import { GameUseCase } from '../../usecases/gameUseCase';
import { IThrow } from 'core/entities/iThrow';

export class GameController {
  private gameUseCase: GameUseCase;

  constructor(gameUseCase: GameUseCase) {
    this.gameUseCase = gameUseCase;
  }

  async createThrow(req: Request, res: Response): Promise<void> {
    try {
      const playerId = Number(req.params.id);

      console.log(playerId);
      await this.gameUseCase.createThrow(playerId);

      res.status(201).json({ message: 'Throw created successfully' });
    } catch (error) {
      console.error('Error creating throw:', error);
      res.status(500).json({ error: 'Error creating throw' });
    }
  }

  async deleteThrows(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedThrows = await this.gameUseCase.deleteThrows(parseInt(id));

      res.status(204).json({ message: 'Throws deleted', deletedThrows });
    } catch (error) {
      console.error('Error deleting throws:', error);
      res.status(500).json({ error: 'Error deleting throws' });
    }
  }

  async findThrowByPlayerId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const throws = await this.gameUseCase.findThrowByPlayerId(parseInt(id));
      res.status(200).json({ message: 'Throws by player', data: throws });
    } catch (error) {
      console.error('Error finding throw by player id:', error);
      res.status(500).json({ error: 'Error finding throw by player id' });
    }
  }
}
