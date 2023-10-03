import { NextFunction, Request, Response } from 'express';
import { CreateStateDto } from '@dtos/state.dto';
import { State } from '@interfaces/state.interface';
import stateService from '@services/state.service';
import statementRuleService from '@services/statementRule.service';
import { StatementRuleDto } from '@/dtos/statementRule.dto';

class StatementRulesController {
  public stateService = new stateService();
  public statementRuleService = new statementRuleService();

  public getStatementRules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const state: State = await this.stateService.findStateById(stateId);

      const statementRules = state.statementRules;
      res.status(200).json(statementRules);
    } catch (error) {
      next(error);
    }
  };

  public createStatementRule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const rule: StatementRuleDto = req.body;
      const state: State = await this.statementRuleService.createStatementRule(stateId, rule);

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };

  public updateStatementRule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const rule: StatementRuleDto = req.body;
      const state: State = await this.statementRuleService.updateStatementRule(stateId, rule);

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };

  public deleteStatementRule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const rule: StatementRuleDto = req.body;
      const state: State = await this.statementRuleService.deleteStatementRule(stateId, rule);

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };
}

export default StatementRulesController;
