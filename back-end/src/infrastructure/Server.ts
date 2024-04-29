import express, { Application } from 'express';
import config from '../config/configDotenv';
import routerGames from '../adapters/routes/diceGameRoutes';

class Server {
  private app: Application;
  private port: number;
  private path = {
    games: '/games'
  };

  constructor() {
    this.app = express();
    this.port = config.port;
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
