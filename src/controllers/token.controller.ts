import { NextFunction, Request, Response } from 'express';
import { TokenDto } from '@dtos/token.dto';
import { IToken } from '@interfaces/token.interface';
import tokenService from '@services/token.service';

class TokensController {
  public tokenService = new tokenService();

  public getTokens = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameId: string = req.params.id;
      const findAllTokensData: IToken[] = await this.tokenService.findAllTokens(gameId);

      res.status(200).json(findAllTokensData);
    } catch (error) {
      next(error);
    }
  };

  public getTokenById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenId: string = req.params.id;
      const findOneTokenData: IToken = await this.tokenService.findTokenById(tokenId);

      res.status(200).json(findOneTokenData);
    } catch (error) {
      next(error);
    }
  };

  public createToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenData: TokenDto = req.body;
      const createTokenData: IToken = await this.tokenService.createToken(tokenData);

      res.status(201).json(createTokenData);
    } catch (error) {
      next(error);
    }
  };

  public updateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenId: string = req.params.id;
      const tokenData: TokenDto = req.body;
      const updateTokenData: IToken = await this.tokenService.updateToken(tokenId, tokenData);

      res.status(200).json(updateTokenData);
    } catch (error) {
      next(error);
    }
  };

  public deleteToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenId: string = req.params.id;
      const gameId: string = req.body.game;

      const deleteTokenData: IToken = await this.tokenService.deleteToken(tokenId, gameId);

      res.status(200).json(deleteTokenData);
    } catch (error) {
      next(error);
    }
  };
}

export default TokensController;
