import { Request, Response } from 'express';
import { PlayerUseCase } from 'application/usecases/playerUseCase';

export class PlayerController {
  constructor(private playerUseCase: PlayerUseCase) {}

  async registerPlayer(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const player = await this.playerUseCase.registerPlayer(name || 'ANONYMOUS');
      res.status(201).json(player);
    } catch (error) {
      console.error('Error registering player:', error);
      res.status(500).json({ error: 'Error registering player' });
    }
  }

  async updatePlayerName(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedPlayer = await this.playerUseCase.updatePlayerName(parseInt(id), name);
      if (!updatedPlayer) {
        res.status(404).json({ error: 'Player not found' });
      } else {
        res.status(200).json(updatedPlayer);
      }
    } catch (error) {
      console.error('Error updating player name:', error);
      res.status(500).json({ error: 'Error updating player name' });
    }
  }

  async getPlayerThrows(req: Request, res: Response): Promise<void> {
    try {
      const { playerId } = req.params;
      const { throws, successRate } = await this.playerUseCase.getPlayerThrows(parseInt(playerId));
      res.status(200).json({ throws, successRate });
    } catch (error) {
      console.error('Error fetching player throws:', error);
      res.status(500).json({ error: 'Error fetching player throws' });
    }
  }
}
