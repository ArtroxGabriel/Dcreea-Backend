import { NextFunction, Request, Response } from 'express';
import { DeckDto } from '@dtos/deck.dto';
import { IDeck } from '@interfaces/deck.interface';
import deckService from '@services/deck.service';
import { ICard } from '@/interfaces/card.interface';
import { logger } from '@/utils/logger';

class DecksController {
    public deckService = new deckService();

    public getDecks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameId: string = req.params.id;
            const findAllDecksData: IDeck[] = await this.deckService.findAllDecks(gameId);

            res.status(200).json(findAllDecksData);
        } catch (error) {
            next(error);
        }
    };

    public getDeckById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deckId: string = req.params.id;
            const findOneDeckData: IDeck = await this.deckService.findDeckById(deckId);

            res.status(200).json(findOneDeckData);
        } catch (error) {
            next(error);
        }
    };

    public createDeck = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deckData: DeckDto = req.body;
            const createDeckData: IDeck = await this.deckService.createDeck(deckData);

            res.status(201).json(createDeckData);
        } catch (error) {
            next(error);
        }
    };

    public updateDeck = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deckData: DeckDto = req.body;
            const updateDeckData: IDeck = await this.deckService.updateDeck(deckData);

            res.status(200).json(updateDeckData);
        } catch (error) {
            next(error);
        }
    };

    public deleteDeck = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('delete params', req.params);
            const deckId: string = req.params.id;
            const deleteDeckData: IDeck = await this.deckService.deleteDeck(deckId);

            res.status(200).json(deleteDeckData);
        } catch (error) {
            next(error);
        }
    };
}

export default DecksController;
