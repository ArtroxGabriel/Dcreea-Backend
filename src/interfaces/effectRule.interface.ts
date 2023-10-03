export interface IEffect {
  _id: string;
  simpleEffect: string;
  statusChange: string;
  toSelfPlayer: boolean;
  toSpecificPlayer: boolean;
  toPlayerRole: string;
  forever: boolean;
  turns: number;
}

export default interface IEffectRule {
  _id: string;
  label: string;
  effect: IEffect[];
}
