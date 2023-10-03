export interface ICard {
    _id: string;
    deck: string;
    repetitions: number;
    cardFront: ICardFront;
    cardBack: ICardBack;
}

export interface ICardFront {
    title: string;
    art: string;
    description: string;
    effect: string;
    cost: number;
    level: number;
    earning: number;
}

export interface ICardBack {
    title: string;
    answers: string;
    effect: string;
    cost: number;
    level: number;
    earning: number;
}
