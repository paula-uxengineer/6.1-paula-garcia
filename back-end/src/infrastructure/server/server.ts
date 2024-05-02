import express, { Application } from 'express';
import config from '../../config/configDotenv';
import playerRouter from '../../adapters/routes/playerRoutes';

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.routes();
  }

  private routes() {
    this.app.use('/players', playerRouter);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

export { Server };
