import IGame from '@/interfaces/game.interface';
import cardModel from '@/models/card.model';
import gameModel from '@/models/game.model';
import { logger } from '@/utils/logger';
import { DeckDto } from '@dtos/deck.dto';
import HttpException from '@exceptions/HttpException';
import { IDeck } from '@interfaces/deck.interface';
import deckModel from '@models/deck.model';
import { isEmpty } from '@utils/util';

class DeckService {
    public deckDB = deckModel;
    public cardDB = cardModel;
    public gameDB = gameModel;

    /**
     * Find all unmaterialized decks from a given game
     * @param gameId :string
     * @returns Promise<IDeck>
     */
    public async findAllDecks(gameId: string): Promise<IDeck[]> {
        const decks: IDeck[] = await this.deckDB.find({ game: gameId });
        return decks;
    }

    /**
     * Searches for a deck by its Id
     * @param deckId :string
     * @returns :Promise<IDeck>
     */
    public async findDeckById(deckId: string): Promise<IDeck> {
        if (isEmpty(deckId)) throw new HttpException(400, 'Invalid id');

        const deck: IDeck = await this.deckDB.findOne({ _id: deckId });
        if (!deck) throw new HttpException(404, 'Deck not found');

        return deck;
    }

    /**
     * Creates a deck inside a game
     * @param deckData :DeckDto
     * @returns Promise<IDeck>
     */
    public async createDeck(deckData: DeckDto): Promise<IDeck> {
        if (isEmpty(deckData)) throw new HttpException(400, 'Empty deck');

        // checking for the game
        var game: IGame = await this.gameDB.findById(deckData.game);
        if (!game) throw new HttpException(404, 'Game not found');

        // creating the deck in DB
        var deck: IDeck = await this.deckDB.create(deckData);
        if (!deck) throw new HttpException(409, 'Error while creating the deck');

        deck = await this.deckDB.findOne({ game: deck.game, name: deck.name });

        logger.info(`deck just created: ${deck}`);

        return deck;
    }

    public async createDecks(decksData: DeckDto[]): Promise<IDeck[]> {
        var gameId = decksData && decksData[0] && decksData[0].game ? decksData[0].game : null;
        if (!gameId) throw new HttpException(400, `game not found`);

        decksData.forEach(st => {
            if (isEmpty(st)) throw new HttpException(400, `deck ${st.name} is not valid`);
            if (st.game !== gameId) throw new HttpException(400, `game at deck ${st.name} is not valid`);
        });

        var game: IGame = await this.gameDB.findById(gameId);
        if (!game) throw new HttpException(404, 'Game not found');

        const deck: IDeck[] = await this.deckDB.insertMany(decksData);
        if (!deck) throw new HttpException(409, `Error while creating decks`);

        return deck;
    }

    /**
     * Updates a deck from a game
     * @param deckId :string
     * @param deckData :DeckDto
     * @returns Promise<IDeck>
     */
    public async updateDeck(deckData: DeckDto): Promise<IDeck> {
        if (isEmpty(deckData)) throw new HttpException(400, "You're not deckData");

        const deck: IDeck = await this.deckDB.findByIdAndUpdate(deckData._id, deckData, { new: true });
        if (!deck) throw new HttpException(409, 'Deck not found while updating');

        return deck;
    }

    /**
     * delete a deck from a game with all his cards
     * @param deckId
     * @returns Promise<IDeck>
     */
    public async deleteDeck(deckId: string): Promise<IDeck> {
        const deck: IDeck = await this.deckDB.findByIdAndDelete(deckId);
        if (!deck) throw new HttpException(409, 'Deck not found while deleting');

        // delete all cards from this deck
        this.cardDB.deleteMany({ deck: deckId });

        return deck;
    }
}

export default DeckService;
