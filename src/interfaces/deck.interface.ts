import { ICard } from './card.interface';

export interface IDeck {
  _id: string;
  game: string;
  name: string;
  color: string;
  description: string;
  deckFront: IDeckFront;
  deckBack: IDeckBack;
}

export interface IDeckFront {
  title: boolean;
  art: boolean;
  description: boolean;
  effect: boolean;
  cost: boolean;
  level: boolean;
  earning: boolean;
}

export interface IDeckBack {
  title: boolean;
  answers: boolean;
  effect: boolean;
  cost: boolean;
  level: boolean;
  earning: boolean;
}
