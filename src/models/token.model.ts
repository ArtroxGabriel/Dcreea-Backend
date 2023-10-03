import { model, Schema, Document } from 'mongoose';
import { IToken } from '@interfaces/token.interface';
import { skillSchema } from './role.model';

export const tokenSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  game: {
    type: String,
    required: true,
  },
  skill: {
    type: skillSchema,
    required: false,
  },
});

const tokenModel = model<IToken & Document>('GameToken', tokenSchema);

export default tokenModel;
