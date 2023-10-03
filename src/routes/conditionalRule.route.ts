import { Router } from 'express';
import ConditionalRuleController from '@controllers/conditionalRule.controller';
import { ConditionalRuleDto } from '@dtos/conditionalRule.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ConditionalRuleRoute implements Route {
  public path = '/conditionalRule';
  public router = Router();
  public conditionalRuleController = new ConditionalRuleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.conditionalRuleController.getConditionalRules);
    this.router.post(`${this.path}/:id`, validationMiddleware(ConditionalRuleDto, 'body'), this.conditionalRuleController.createConditionalRule);
    this.router.patch(`${this.path}/:id`, validationMiddleware(ConditionalRuleDto, 'body'), this.conditionalRuleController.updateConditionalRule);
    this.router.delete(`${this.path}/:id`, validationMiddleware(ConditionalRuleDto, 'body'), this.conditionalRuleController.deleteConditionalRule);
  }
}

export default ConditionalRuleRoute;
