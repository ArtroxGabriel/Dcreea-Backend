import { NextFunction, Request, Response } from 'express';
import { CardDto } from '@dtos/card.dto';
import { ICard } from '@interfaces/card.interface';
import cardService from '@services/card.service';

class CardsController {
  public cardService = new cardService();

  public getCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.params.id;
      const findAllCardsData: ICard[] = await this.cardService.findAllCards(deckId);

      res.status(200).json(findAllCardsData);
    } catch (error) {
      next(error);
    }
  };

  public getCardById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId: string = req.params.id;
      const findOneCardData: ICard = await this.cardService.findCardById(cardId);

      res.status(200).json(findOneCardData);
    } catch (error) {
      next(error);
    }
  };

  public createCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: CardDto = req.body;
      const createdCard: ICard = await this.cardService.createCard(cardData);

      res.status(201).json(createdCard);
    } catch (error) {
      next(error);
    }
  };

  public updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardData: CardDto = req.body;
      const updateCardData: ICard = await this.cardService.updateCard(cardData);

      res.status(200).json(updateCardData);
    } catch (error) {
      next(error);
    }
  };

  public deleteCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cardId: string = req.params.id;

      const deleteCardData: ICard = await this.cardService.deleteCard(cardId);

      res.status(200).json(deleteCardData);
    } catch (error) {
      next(error);
    }
  };
}

export default CardsController;
