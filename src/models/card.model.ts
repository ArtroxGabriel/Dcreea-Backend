import { model, Schema, Document } from 'mongoose';
import { ICard } from '@interfaces/card.interface';

const cardFrontSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    art: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    effect: {
        type: String,
        required: false,
    },
    cost: {
        type: Number,
        required: false,
    },
    level: {
        type: Number,
        required: false,
    },
    earning: {
        type: Number,
        required: false,
    },
});

// /**
//  * @typedef cardFrontModel
//  */
// export const cardFrontModel = model<ICardFront & Document>('CardFront', cardFrontSchema);

const cardBackSchema: Schema = new Schema({
    title: {
        type: String,
        required: false,
        unique: false,
    },
    answers: {
        type: String,
        required: false,
    },
    effect: {
        type: String,
        required: false,
    },
    cost: {
        type: Number,
        required: false,
    },
    level: {
        type: Number,
        required: false,
    },
    earning: {
        type: Number,
        required: false,
    },
});

// /**
//  * @typedef cardBackModel
//  */
// export const cardBackModel = model<ICardBack & Document>('CardBack', cardBackSchema);

export const cardSchema: Schema = new Schema({
    deck: {
        type: String,
        required: true,
    },
    repetitions: {
        type: Number,
        required: true,
    },
    cardFront: {
        type: cardFrontSchema,
        required: true,
    },
    cardBack: {
        type: cardBackSchema,
        required: false,
    },
});

const cardModel = model<ICard & Document>('Card', cardSchema);

export default cardModel;
