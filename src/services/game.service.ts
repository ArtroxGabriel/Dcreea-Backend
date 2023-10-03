import { State } from '@/interfaces/state.interface';
import deckModel from '@/models/deck.model';
import { defaultDecks, defaultStates, gameDefault } from '@/models/defaultGame';
import stateModel from '@/models/state.model';
import { logger } from '@/utils/logger';
import { GameDto } from '@dtos/game.dto';
import HttpException from '@exceptions/HttpException';
import IGame from '@interfaces/game.interface';
import gameModel from '@models/game.model';
import DeckService from '@services/deck.service';
import StateService from '@services/state.service';
import { isEmpty } from '@utils/util';

class GameService {
    public games = gameModel;
    public stateDB = stateModel;
    public deckDB = deckModel;

    public deckService = new DeckService();
    public stateService = new StateService();

    public async findAllGames(gameData: GameDto): Promise<IGame[]> {
        const games: IGame[] = await this.games.find({ user: gameData.user });
        return games;
    }

    public async findGameById(gameId: string): Promise<IGame> {
        if (isEmpty(gameId)) throw new HttpException(400, 'This game is not valid');

        const findGame: IGame = await this.games.findOne({ _id: gameId });
        if (!findGame) throw new HttpException(409, 'There was a conflict with another game');

        return findGame;
    }

    /**
     * Creates the default game
     * @param gameData
     * @returns
     */
    public async createGame(gameData: GameDto): Promise<IGame> {
        try {
            if (isEmpty(gameData)) throw new HttpException(400, 'This game is not valid');

            var game: GameDto = gameDefault;
            game._id = gameData._id;
            game.user = gameData.user;
            game.name = gameData.name ? gameData.name : game.name;
            game.description = gameData.description ? gameData.description : game.description;
            game.audience = gameData.audience ? gameData.audience : game.audience;
            game.knowledgeField = gameData.knowledgeField ? gameData.knowledgeField : game.knowledgeField;
            game.minNumberPlayers = gameData.minNumberPlayers ? gameData.minNumberPlayers : game.minNumberPlayers;
            game.maxNumberPlayers = gameData.maxNumberPlayers ? gameData.maxNumberPlayers : game.maxNumberPlayers;
            game.authors = gameData.authors ? gameData.authors : game.authors;

            // validate duplicity dto

            var gameCreated: IGame = await this.games.create(game);
            if (!gameCreated) throw new HttpException(409, 'There was an error while creating the game');

            //////////////////////////

            gameCreated = await this.games.findOne({ name: gameCreated.name, user: gameCreated.user });
            game._id = gameCreated._id;

            //////////////////////////

            // add decks
            const decks = defaultDecks;

            for (var i = 0; i < decks.length; i++) {
                decks[i].game = game._id;
            }

            await deckModel.insertMany(decks);

            // add states
            const states = defaultStates;

            for (var l = 0; l < states.length; l++) {
                states[l].game = game._id;
            }

            await stateModel.insertMany(states);

            return gameCreated;
        } catch (error) {
            throw new HttpException(400, `${error}`);
        }
    }

    public async updateGame(gameData: GameDto): Promise<IGame> {
        if (isEmpty(gameData)) throw new HttpException(400, 'This game is not valid');

        const updateGameById: IGame = await this.games.findByIdAndUpdate(gameData._id, gameData, { new: true });
        if (!updateGameById) throw new HttpException(409, 'There was a conflict with another game');

        return updateGameById;
    }

    public async deleteGame(gameId: string): Promise<IGame> {
        const deleteGameById: IGame = await this.games.findByIdAndDelete(gameId);
        if (!deleteGameById) throw new HttpException(404, 'Game not found');

        return deleteGameById;
    }
}

export default GameService;
