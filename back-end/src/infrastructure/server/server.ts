import express, { Application } from 'express';
import config from '../../config/configDotenv';
// import playerRouter from '../../adapters/routes/playerRoutes';

class Server {
  private app: Application;
  private port: number;
  private path = {
    players: '/players'
  };

  constructor() {
    this.app = express();
    this.port = config.port;
    // this.routes();
  }

  // routes() {
  //   this.app.use(this.path.players, playerRouter);
  // }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

export default Server;
