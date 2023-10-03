import { NextFunction, Request, Response } from 'express';
import { State } from '@interfaces/state.interface';
import stateService from '@services/state.service';
import conditionalRuleService from '@services/conditionalRule.service';
import { ConditionalRuleDto } from '@/dtos/conditionalRule.dto';

class ConditionalRulesController {
  public stateService = new stateService();
  public conditionalRuleService = new conditionalRuleService();

  public getConditionalRules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const state: State = await this.stateService.findStateById(stateId);

      const conditionalRules = state.conditionalRule ? state.conditionalRule : undefined;
      res.status(200).json(conditionalRules);
    } catch (error) {
      next(error);
    }
  };

  public createConditionalRule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const rule: ConditionalRuleDto = req.body;
      const state: State = await this.conditionalRuleService.createConditionalRule(stateId, rule);

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };

  public updateConditionalRule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const rule: ConditionalRuleDto = req.body;
      const state: State = await this.conditionalRuleService.updateConditionalRule(stateId, rule);

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };

  public deleteConditionalRule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const rule: ConditionalRuleDto = req.body;
      const state: State = await this.conditionalRuleService.deleteConditionalRule(stateId, rule);

      res.status(200).json(state);
    } catch (error) {
      next(error);
    }
  };
}

export default ConditionalRulesController;
