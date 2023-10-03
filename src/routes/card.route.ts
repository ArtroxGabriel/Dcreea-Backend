import { Router } from 'express';
import CardController from '@controllers/card.controller';
import { CardDto } from '@dtos/card.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CardRoute implements Route {
  public path = '/card';
  public router = Router();
  public cardController = new CardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all/:id`, this.cardController.getCards);
    this.router.get(`${this.path}/:id`, this.cardController.getCardById);
    this.router.post(`${this.path}`, validationMiddleware(CardDto, 'body'), this.cardController.createCard);
    this.router.put(`${this.path}`, validationMiddleware(CardDto, 'body', true), this.cardController.updateCard);
    this.router.delete(`${this.path}/:id`, this.cardController.deleteCard);
  }
}

export default CardRoute;
