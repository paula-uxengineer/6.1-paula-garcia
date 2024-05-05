import express from 'express';
import config from '../../config/configDotenv';
import playerRouter from '../../adapters/routes/playerRoutes';
import gameRouter from '../../adapters/routes/gameRoutes';
import rankingRouter from '../../adapters/routes/rankingRoutes';

class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.port = config.port;
    this.routes();
  }

  public routes() {
    this.app.use('/players', playerRouter);
    this.app.use('/games', gameRouter);
    this.app.use('/ranking', rankingRouter);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

export { Server };
