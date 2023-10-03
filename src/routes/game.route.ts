import { Router } from 'express';
import GameController from '@controllers/game.controller';
import { GameDto } from '@dtos/game.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class GameRoute implements Route {
  public path = '/game';
  public router = Router();
  public gameController = new GameController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/all`, this.gameController.getGames);
    this.router.post(`${this.path}/find`, this.gameController.getGameById);
    this.router.post(`${this.path}`, validationMiddleware(GameDto, 'body'), this.gameController.createGame);
    this.router.put(`${this.path}`, validationMiddleware(GameDto, 'body'), this.gameController.updateGame);
    this.router.delete(`${this.path}/:id`, validationMiddleware(GameDto, 'body'), this.gameController.deleteGame);
  }
}

export default GameRoute;
