import { IPlayer } from 'core/entities/iPlayer';
import { Request, Response } from 'express';
import { PlayerUseCase } from 'usecases/playerUseCase';

export class PlayerController {
  constructor(private playerUseCase: PlayerUseCase) {}

  async createPlayer(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, creationDate, successRate, throws } = req.body;

      const player: IPlayer = {
        name,
        creationDate,
        successRate,
        throws
      };

      const createdPlayer = await this.playerUseCase.createPlayer(player);

      res.status(201).json({ message: 'Player created: ', createdPlayer });
    } catch (error) {
      console.error('Error registering player:', error);
      res.status(500).json({ error: 'Error registering player' });
    }
  }

  async registerPlayer(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name;
      const player = await this.playerUseCase.registerPlayer(name || 'ANONYMOUS');
      res.status(201).json({ message: 'Player registered.', player });
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
        res.status(200).json({ message: 'New name: ', updatedPlayer });
      }
    } catch (error) {
      console.error('Error updating player name:', error);
      res.status(500).json({ error: 'Error updating player name' });
    }
  }

  async getPlayerThrowsAndSuccessRate(req: Request, res: Response): Promise<void> {
    try {
      const playerId = parseInt(req.params.playerId);
      const { players, averageSuccessRate } =
        await this.playerUseCase.findThrowsAndSuccessRate(playerId);

      res.status(200).json({ message: 'Average success rate: ', players, averageSuccessRate });
    } catch (error) {
      console.error('Error fetching player throws and average success rates:', error);
      res.status(500).json({ error: 'Error fetching player throws and success rates' });
    }
  }

  async getAllPlayers(req: Request, res: Response): Promise<void> {
    try {
      const players = await this.playerUseCase.findAllPlayers();
      res.status(200).json({ message: 'All players founded: ', players });
    } catch (error) {
      console.error('Error retrieving players:', error);
      res.status(500).json({ error: 'Error retrieving players' });
    }
  }

  async deleteAllPlayers(req: Request, res: Response): Promise<void> {
    try {
      await this.playerUseCase.deleteAllPlayers();
      res.status(200).json({ message: 'All players deleted successfully' });
    } catch (error) {
      console.error('Error deleting all players:', error);
      res.status(500).json({ error: 'Error deleting all players' });
    }
  }
}
