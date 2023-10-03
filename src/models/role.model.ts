import { model, Schema, Document } from 'mongoose';
import { IRole, ISkill } from '@interfaces/role.interface';
import { effectSchema } from './effectRule.model';

export const skillSchema: Schema = new Schema({
  goodSide: {
    type: effectSchema,
    required: true,
  },
  badSide: {
    type: effectSchema,
    required: false,
  },
});

// /**
//  * @typedef skillModel
//  */
// export const skillModel = model<ISkill & Document>('Skill', skillSchema);

export const roleSchema: Schema = new Schema({
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

/**
 * @typedef Role
 */
const roleModel = model<IRole & Document>('Role', roleSchema);

export default roleModel;
