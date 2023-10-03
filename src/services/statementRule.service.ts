import { StatementRuleDto } from '@/dtos/statementRule.dto';
import HttpException from '@exceptions/HttpException';
import { State } from '@interfaces/state.interface';
import stateModel from '@models/state.model';
import { isEmpty, MapElement } from '@utils/util';
import IStatementRule from '@/interfaces/statementRule.interface';
import { CreateStateDto } from '@/dtos/state.dto';

class StatementRuleService {
  public states = stateModel;

  /**
   * Creates a Statement Rule inside a given state
   * @param stateId string
   * @param rule StatementRuleDto
   * @returns Promise<State>
   */
  public async createStatementRule(stateId: string, rule: StatementRuleDto): Promise<State> {
    if (isEmpty(rule)) throw new HttpException(400, 'The Statement Rule is empty');

    var state: State = await this.states.findById(stateId);
    if (!state) throw new HttpException(404, 'State not found');

    if (rule.label) {
      state.statementRules.forEach((el: IStatementRule) => {
        if (el.label === rule.label) throw new HttpException(409, `The label ${rule.label} already exists in this state`);
      });
    }

    state.statementRules.push(rule);

    const updatedState = await this.states.findByIdAndUpdate(state._id, state);
    if (!updatedState) throw new HttpException(409, 'An conflict occurred with another state');

    return state;
  }

  /**
   * Updates the statement rule from a given state
   * @param stateId string
   * @param rule StatementRuleDto
   * @returns Promise<State>
   */
  public async updateStatementRule(stateId: string, rule: StatementRuleDto): Promise<State> {
    if (isEmpty(rule)) throw new HttpException(400, 'The Statement Rule is empty');

    var state: State = await this.states.findById(stateId);
    if (!state) throw new HttpException(404, 'State not found');

    // validating duplicated label
    state.statementRules.forEach((el: IStatementRule) => {
      if (el.label === rule.label && el._id != rule._id)
        throw new HttpException(409, `The label ${rule.label} already exists in another rule from this state`);
    });

    var found = false;

    // saving the updated
    for (var i = 0; i < state.statementRules.length; i++) {
      if (state.statementRules[i]._id == rule._id) {
        state.statementRules[i] = MapElement<IStatementRule>(state.statementRules[i], rule);
        found = true;
        break;
      }
    }

    if (!found) throw new HttpException(404, 'Statement rule not found');

    // saving the state
    const updatedState = await this.states.findByIdAndUpdate(state._id, state, { new: true });
    if (!updatedState) throw new HttpException(409, 'An conflict occurred with another state');

    return state;
  }

  /**
   * deletes a statement rule from a given state
   * @param stateId string
   * @param rule StatementRuleDto
   * @returns Promise<State>
   */
  public async deleteStatementRule(stateId: string, rule: StatementRuleDto): Promise<State> {
    if (isEmpty(rule)) throw new HttpException(400, 'The Statement Rule is empty');

    var state: State = await this.states.findById(stateId);
    if (!state) throw new HttpException(404, 'State not found');

    var found = false;

    for (var i = 0; i < state.statementRules.length; i++) {
      if (state.statementRules[i]._id == rule._id) {
        state.statementRules.splice(i, 1);
        found = true;
        break;
      }
    }

    if (!found) throw new HttpException(404, 'Statement rule not found');

    const updatedState = await this.states.findByIdAndUpdate(state._id, state);
    if (!updatedState) throw new HttpException(409, 'An conflict occurred with another state');

    return state;
  }
}

export default StatementRuleService;
