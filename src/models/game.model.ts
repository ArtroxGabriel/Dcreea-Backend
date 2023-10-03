import IGame from '@/interfaces/game.interface';
import { Schema, model, Document } from 'mongoose';

export const gameSchema: Schema = new Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: false,
      sparse: true,
    },
    description: {
      type: String,
      required: false,
      sparse: true,
    },
    simplyGameplay: {
      type: String,
      required: true,
      sparse: true,
    },
    knowledgeField: {
      type: String,
      required: false,
      sparse: true,
    },
    requirements: {
      type: String,
      required: false,
      sparse: true,
    },
    audience: {
      type: String,
      required: false,
      sparse: true,
    },
    minNumberPlayers: {
      type: Number,
      required: false,
      sparse: true,
    },
    maxNumberPlayers: {
      type: Number,
      required: false,
      sparse: true,
    },
    authors: {
      type: [String],
      required: false,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

const gameModel = model<IGame & Document>('Game', gameSchema);

export default gameModel;
