import { IStatementRuleDescription } from '@/interfaces/statementRule.interface';
import IStatementRule from '@/interfaces/statementRule.interface';
import { Schema, model, Document } from 'mongoose';

export const statementRuleSchema: Schema = new Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
            unique: false,
        },
        simplerDescription: {
            type: String,
            required: true,
            trim: true,
        },
        me: {
            type: String,
            required: false,
            trim: true,
        },
        to: {
            type: String,
            required: false,
            trim: true,
        },
        given: {
            type: String,
            required: false,
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
    },
    {
        timestamps: true,
    },
);

/**
 * @typedef StatementRule
 */
export const StatementRule = model<IStatementRule & Document>('StatementRule', statementRuleSchema);
