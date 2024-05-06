import express from 'express';
import config from '../../config/configDotenv';
import playerRouter from '../../controllers/routes/playerRoutes';
import gameRouter from '../../controllers/routes/gameRoutes';
import rankingRouter from '../../controllers/routes/rankingRoutes';

class Server {
  public app: express.Application;
  public port: number;

  constructor(port?: number) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.port = port || config.port;
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
