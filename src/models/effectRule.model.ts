import IEffectRule, { IEffect } from '@/interfaces/effectRule.interface';
import { Schema, model, Document } from 'mongoose';

export const effectSchema: Schema = new Schema({
  simpleEffect: {
    type: String,
    required: true,
    trim: true,
    sparse: true,
  },
  statusChange: {
    type: String,
    required: false,
    trim: true,
    sparse: true,
  },
  toSelfPlayer: {
    type: Boolean,
    required: false,
    sparse: true,
  },
  toSpecificPlayer: {
    type: Boolean,
    required: false,
    sparse: true,
  },
  toPlayerRole: {
    type: String,
    required: false,
    sparse: true,
  },
  forever: {
    type: Boolean,
    required: false,
    sparse: true,
  },
  turns: {
    type: Number,
    required: false,
    sparse: true,
  },
});

// /**
//  * @typedef effectModel
//  */
// export const effectModel = model<IEffect & Document>('Effect', effectSchema);

export const effectRuleSchema: Schema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      unique: false,
      sparse: true,
    },
    effect: {
      type: [effectSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef EffectRule
 */
export const EffectRule = model<IEffectRule & Document>('EffectRule', effectRuleSchema);
