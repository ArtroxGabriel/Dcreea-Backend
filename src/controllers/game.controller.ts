import { NextFunction, Request, Response } from 'express';
import { GameDto } from '@dtos/game.dto';
import IGame from '@interfaces/game.interface';
import gameService from '@services/game.service';
import StateService from '@/services/state.service';
import { defaultDecks, defaultStates } from '@/models/defaultGame';
import { State } from '@/interfaces/state.interface';
import { CreateStateDto } from '@/dtos/state.dto';
import { DeckDto } from '@/dtos/deck.dto';
import DeckService from '@/services/deck.service';
import { IDeck } from '@/interfaces/deck.interface';

class GamesController {
    public gameService = new gameService();
    public stateService = new StateService();
    public decksService = new DeckService();

    public getGames = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameData: GameDto = req.body;
            const games: IGame[] = await this.gameService.findAllGames(gameData);

            res.status(200).json(games);
        } catch (error) {
            next(error);
        }
    };

    public getGameById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameData: GameDto = req.body;
            const gameId: string = gameData._id;
            const game: IGame = await this.gameService.findGameById(gameId);

            const states: State[] = await this.stateService.findAllState(gameId);

            const decks: IDeck[] = await this.decksService.findAllDecks(gameId);

            res.status(200).json({ game, states, decks });
        } catch (error) {
            next(error);
        }
    };

    public createGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameData: GameDto = req.body;
            const game: IGame = await this.gameService.createGame(gameData);

            const states: State[] = await this.stateService.findAllState(game._id);
            const decks: IDeck[] = await this.decksService.findAllDecks(game._id);

            res.status(201).json({ game, states, decks });
        } catch (error) {
            next(error);
        }
    };

    public updateGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameData: GameDto = req.body;
            const updateGameData: IGame = await this.gameService.updateGame(gameData);

            res.status(200).json(updateGameData);
        } catch (error) {
            next(error);
        }
    };

    public deleteGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameId: string = req.params.id;
            const deleteGameData: IGame = await this.gameService.deleteGame(gameId);

            res.status(200).json(deleteGameData);
        } catch (error) {
            next(error);
        }
    };
}

export default GamesController;
