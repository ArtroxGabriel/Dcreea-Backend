import IConditionalRule from './conditionalRule.interface';
import IEffectRule from './effectRule.interface';
import IStatementRule from './statementRule.interface';

export interface State {
    _id: any;
    label: string;
    game: string;
    purpose: string;
    statementRules: IStatementRule[];
    conditionalRule: IConditionalRule;
    transition: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}
