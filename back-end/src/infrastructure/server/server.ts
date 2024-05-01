import express, { Application } from 'express';
import config from '../../config/configDotenv';

class Server {
  private app: Application;
  private port: number;
  private path = {
    players: '/players'
  };

  constructor() {
    this.app = express();
    this.port = config.port;
    this.routes();
  }

  routes() {
    this.app.use(this.path.players);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

export default Server;
