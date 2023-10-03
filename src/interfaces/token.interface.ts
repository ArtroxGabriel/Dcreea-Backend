import { ISkill } from './role.interface';

export interface IToken {
  _id: string;
  game: string;
  name: string;
  skill: ISkill;
}
