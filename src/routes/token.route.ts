import { Router } from 'express';
import TokenController from '@controllers/token.controller';
import { TokenDto } from '@dtos/token.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TokenRoute implements Route {
  public path = '/token';
  public router = Router();
  public tokenController = new TokenController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.tokenController.getTokens);
    this.router.post(`${this.path}/:id`, validationMiddleware(TokenDto, 'body'), this.tokenController.createToken);
    this.router.put(`${this.path}/:id`, validationMiddleware(TokenDto, 'body', true), this.tokenController.updateToken);
    this.router.delete(`${this.path}/:id`, this.tokenController.deleteToken);
  }
}

export default TokenRoute;
