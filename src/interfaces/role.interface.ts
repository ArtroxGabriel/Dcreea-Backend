import { IEffect } from './effectRule.interface';

export interface IRole {
  _id: string;
  game: string;
  name: string;
  skill: ISkill;
}

export interface ISkill {
  goodSide: IEffect;
  badSide: IEffect;
}
