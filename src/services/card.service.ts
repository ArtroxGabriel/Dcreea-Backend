import { CardDto } from '@dtos/card.dto';
import HttpException from '@exceptions/HttpException';
import { ICard } from '@interfaces/card.interface';
import cardModel from '@models/card.model';
import { isEmpty } from '@utils/util';
import { IDeck } from '@/interfaces/deck.interface';
import deckModel from '@/models/deck.model';

class CardService {
    public cardDB = cardModel;
    public deckDB = deckModel;

    /**
     * Searches for all the cards from a given deck
     * @param deckId :string
     * @returns Promise<ICard[]>
     */
    public async findAllCards(deckId: string): Promise<ICard[]> {
        const cards: ICard[] = await this.cardDB.find({ deck: deckId });
        return cards;
    }

    /**
     * Searches for a card by Id
     * @param cardId :string
     * @returns Promise<ICard[]>
     */
    public async findCardById(cardId: string): Promise<ICard> {
        if (isEmpty(cardId)) throw new HttpException(400, 'Invalid id');

        const card: ICard = await this.cardDB.findOne({ _id: cardId });
        if (!card) throw new HttpException(404, 'Card not found');

        return card;
    }

    /**
     * Creates a
     * @param cardData string
     * @returns Promise<ICard[]>
     */
    public async createCard(cardData: CardDto): Promise<ICard> {
        if (isEmpty(cardData)) throw new HttpException(400, 'Empty card');

        var deck: IDeck = await this.deckDB.findOne({ _id: cardData.deck });
        if (!deck) throw new HttpException(400, 'Deck id is not valid. This card needs a deck');

        var card: ICard = await this.cardDB.create(cardData);
        if (!card) throw new HttpException(409, 'Error while creating the card');

        card = await this.cardDB.findOne({ deck: card.deck, cardFront: card.cardFront, cardBack: card.cardBack, repetitions: card.repetitions });

        return card;
    }

    /**
     * Updates a card inside a deck
     * @param cardId string
     * @param cardData CardDto
     * @returns Promise<ICard>
     */
    public async updateCard(cardData: CardDto): Promise<ICard> {
        if (isEmpty(cardData)) throw new HttpException(400, 'Empty card');

        const deck: IDeck = await this.deckDB.findOne({ _id: cardData.deck });
        if (!deck) throw new HttpException(400, 'Deck id is not valid. This card needs a deck');

        const card: ICard = await this.cardDB.findByIdAndUpdate(cardData._id, cardData, { new: true });
        if (!card) throw new HttpException(409, 'Error while updating the card');

        return card;
    }

    /**
     *
     * @param cardId string
     * @param deckId
     * @returns
     */
    public async deleteCard(cardId: string): Promise<ICard> {
        const card: ICard = await this.cardDB.findByIdAndDelete(cardId);
        if (!card) throw new HttpException(409, "You're not card");

        var deck: IDeck = await this.deckDB.findOne({ _id: card.deck });
        if (!deck) throw new HttpException(400, 'Deck id is not valid. This card needs a deck');

        return card;
    }
}

export default CardService;
