import { IEffect } from './effectRule.interface';

export default interface IConditionalRule {
  _id: string;
  label: string;
  conditions: ICondition[];
  failureCondition: ICondition;
}

export interface ICondition {
  test: string;
  effectIfTrue: IEffect;
  stateIfTrue: string;
}
