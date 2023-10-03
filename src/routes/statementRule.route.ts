import { Router } from 'express';
import StatementRuleController from '@controllers/statementRule.controller';
import { StatementRuleDto } from '@dtos/statementRule.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class StatementRuleRoute implements Route {
  public path = '/statementRule';
  public router = Router();
  public statementRuleController = new StatementRuleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.statementRuleController.getStatementRules);
    this.router.post(`${this.path}/:id`, validationMiddleware(StatementRuleDto, 'body'), this.statementRuleController.createStatementRule);
    this.router.patch(`${this.path}/:id`, validationMiddleware(StatementRuleDto, 'body'), this.statementRuleController.updateStatementRule);
    this.router.delete(`${this.path}/:id`, validationMiddleware(StatementRuleDto, 'body'), this.statementRuleController.deleteStatementRule);
  }
}

export default StatementRuleRoute;
