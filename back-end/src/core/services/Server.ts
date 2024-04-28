import express, { Application } from 'express';
import config from '../../config/index';
import routerGames from '../../adapters/routes/diceGameRoutes';

class Server {
  private app: Application;
  private port: string;
  private path = {
    games: '/games'
  };

  constructor() {
    this.app = express();
    this.port = config.port as string;
    this.routes();
  }

  routes() {
    this.app.use(this.path.games, routerGames);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}

export default Server;
