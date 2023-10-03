import { ConditionalRuleDto } from '@/dtos/conditionalRule.dto';
import HttpException from '@exceptions/HttpException';
import { State } from '@interfaces/state.interface';
import stateModel from '@models/state.model';
import { isEmpty } from '@utils/util';

class ConditionalRuleService {
  public states = stateModel;

  public async createConditionalRule(stateId: string, rule: ConditionalRuleDto): Promise<State> {
    if (isEmpty(rule)) throw new HttpException(400, 'The Conditional Rule is empty');

    var state: State = await this.states.findById(stateId);
    if (!state) throw new HttpException(404, 'State not found');

    state.conditionalRule = rule;

    const updatedState = await this.states.findByIdAndUpdate(state._id, state, { new: true });
    if (!updatedState) throw new HttpException(409, 'An conflict occurred with another state');

    return state;
  }

  public async updateConditionalRule(stateId: string, rule: ConditionalRuleDto): Promise<State> {
    if (isEmpty(rule)) throw new HttpException(400, 'The Conditional Rule is empty');

    var state: State = await this.states.findById(stateId);
    if (!state) throw new HttpException(404, 'State not found');

    if (state.conditionalRule && state.conditionalRule._id != rule._id) throw new HttpException(400, 'the rule id does not correspond');

    state.conditionalRule = rule;

    const updatedState = await this.states.findByIdAndUpdate(state._id, state, { new: true });
    if (!updatedState) throw new HttpException(409, 'An conflict occurred with another state');

    return state;
  }

  public async deleteConditionalRule(stateId: string, rule: ConditionalRuleDto): Promise<State> {
    if (isEmpty(rule)) throw new HttpException(400, 'The Conditional Rule is empty');

    var state: State = await this.states.findById(stateId);
    if (!state) throw new HttpException(404, 'State not found');

    state.conditionalRule = null;

    const updatedState = await this.states.findByIdAndUpdate(state._id, state, { new: true });
    if (!updatedState) throw new HttpException(409, 'An conflict occurred with another state');

    return state;
  }
}

export default ConditionalRuleService;
