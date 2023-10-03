import { Schema } from 'mongoose';
import { effectSchema } from './effectRule.model';

export const conditionSchema: Schema = new Schema({
  test: {
    type: String,
    required: true,
    trim: true,
    sparse: true,
  },
  stateIfTrue: {
    type: String,
    required: true,
    trim: true,
    sparse: true,
  },
  effectIfTrue: {
    type: effectSchema,
    required: true,
    trim: true,
    sparse: true,
  },
});

// /**
//  * @typedef conditionModel
//  */
// export const conditionModel = model<ICondition & Document>('Condition', conditionSchema);

export const conditionalRuleSchema: Schema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      unique: false,
      sparse: true,
    },
    conditions: {
      type: [conditionSchema],
      required: true,
      sparse: true,
    },
    failureCondition: {
      type: conditionSchema,
      required: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef ConditionalRule
 */
// export const ConditionalRule = model<IConditionalRule & Document>('ConditionalRule', conditionalRuleSchema);
