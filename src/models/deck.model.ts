import { model, Schema, Document } from 'mongoose';
import { IDeck, IDeckBack, IDeckFront } from '@interfaces/deck.interface';

const deckFrontSchema: Schema = new Schema({
  title: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  art: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  description: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  effect: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  cost: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  level: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  earning: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
});

// /**
//  * @typedef deckFrontModel
//  */
// export const deckFrontModel = model<IDeckFront & Document>('DeckFront', deckFrontSchema);

const deckBackSchema: Schema = new Schema({
  title: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  answers: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  effect: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  cost: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  level: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
  earning: {
    type: Boolean,
    required: true,
    unique: false,
    sparse: true,
  },
});

// /**
//  * @typedef deckBackModel
//  */
// export const deckBackModel = model<IDeckBack & Document>('DeckBack', deckBackSchema);

export const deckSchema: Schema = new Schema({
  game: {
    type: String,
    required: true,
    unique: false,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
    sparse: true,
  },
  color: {
    type: String,
    required: true,
    unique: false,
    sparse: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
    sparse: true,
  },
  deckFront: {
    type: deckFrontSchema,
    required: true,
    unique: false,
    sparse: true,
  },
  deckBack: {
    type: deckBackSchema,
    required: false,
  },
});

const deckModel = model<IDeck & Document>('Deck', deckSchema);

export default deckModel;
