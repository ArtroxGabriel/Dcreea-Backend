import { Router } from 'express';
import DeckController from '@controllers/deck.controller';
import { DeckDto } from '@dtos/deck.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DeckRoute implements Route {
    public path = '/deck';
    public router = Router();
    public deckController = new DeckController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/All/:id`, this.deckController.getDecks);
        this.router.get(`${this.path}/:id`, this.deckController.getDeckById);
        this.router.post(`${this.path}`, validationMiddleware(DeckDto, 'body'), this.deckController.createDeck);
        this.router.put(`${this.path}`, validationMiddleware(DeckDto, 'body', true), this.deckController.updateDeck);
        this.router.delete(`${this.path}/:id`, this.deckController.deleteDeck);
    }
}

export default DeckRoute;
