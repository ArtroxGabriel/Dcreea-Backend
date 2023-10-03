import { State } from '@/interfaces/state.interface';
import { model, Schema, Document } from 'mongoose';
import { conditionalRuleSchema } from './conditionalRule.model';
import { effectRuleSchema } from './effectRule.model';
import { statementRuleSchema } from './statementRule.model';

// problemas? só derrubar o banco!

const stateSchema: Schema = new Schema(
    {
        label: {
            type: String,
            required: true,
            trim: true,
        },
        game: {
            type: String,
            required: true,
        },
        purpose: {
            type: String,
            required: false,
            trim: true,
        },
        conditionalRule: {
            type: conditionalRuleSchema,
            required: false,
            sparse: true,
        },
        statementRules: {
            type: [statementRuleSchema],
            required: false,
            sparse: true,
        },
        transition: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            required: false,
        },
        x: {
            type: Number,
            required: false,
        },
        y: {
            type: Number,
            required: false,
        },
        width: {
            type: Number,
            required: false,
        },
        height: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const stateModel = model<State & Document>('GameState', stateSchema);

export default stateModel;
