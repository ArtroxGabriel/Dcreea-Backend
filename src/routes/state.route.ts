import { Router } from 'express';
import StateController from '@controllers/state.controller';
import { CreateStateDto, SearchStateDto } from '@dtos/state.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class StateRoute implements Route {
  public path = '/state';
  public router = Router();
  public stateController = new StateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/all`, validationMiddleware(SearchStateDto, 'body'), this.stateController.getStates);
    this.router.get(`${this.path}/:id`, this.stateController.getStateById);
    this.router.post(`${this.path}`, validationMiddleware(CreateStateDto, 'body'), this.stateController.createState);
    this.router.put(`${this.path}`, validationMiddleware(CreateStateDto, 'body', true), this.stateController.updateState);
    this.router.delete(`${this.path}/:id`, this.stateController.deleteState);
  }
}

export default StateRoute;
