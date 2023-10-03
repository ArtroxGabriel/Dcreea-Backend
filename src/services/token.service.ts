import { TokenDto } from '@dtos/token.dto';
import HttpException from '@exceptions/HttpException';
import { IToken } from '@interfaces/token.interface';
import tokenModel from '@models/token.model';
import { isEmpty } from '@utils/util';
import IGame from '@/interfaces/game.interface';
import gameModel from '@/models/game.model';

class TokenService {
  public tokendb = tokenModel;
  public gamedb = gameModel;

  public async findAllTokens(gameId: string): Promise<IToken[]> {
    const tokens: IToken[] = await this.tokendb.find({ game: gameId });
    return tokens;
  }

  public async findTokenById(tokenId: string): Promise<IToken> {
    if (isEmpty(tokenId)) throw new HttpException(400, 'Invalid id');

    const token: IToken = await this.tokendb.findOne({ _id: tokenId });
    if (!token) throw new HttpException(404, 'Token not found');

    return token;
  }

  public async createToken(tokenData: TokenDto): Promise<IToken> {
    if (isEmpty(tokenData)) throw new HttpException(400, 'Empty token');

    var game: IGame = await this.gamedb.findOne({ _id: tokenData.game });
    if (!game) throw new HttpException(400, 'Game id is not valid. This token needs a game');

    const token: IToken = await this.tokendb.create(tokenData);

    return token;
  }

  public async updateToken(tokenId: string, tokenData: TokenDto): Promise<IToken> {
    if (isEmpty(tokenData)) throw new HttpException(400, "You're not tokenData");

    const game: IGame = await this.gamedb.findOne({ _id: tokenData.game });
    if (!game) throw new HttpException(400, 'Game id is not valid. This token needs a game');

    const token: IToken = await this.tokendb.findByIdAndUpdate(tokenId, tokenData, { new: true });
    if (!token) throw new HttpException(409, "You're not token");

    return token;
  }

  public async deleteToken(tokenId: string, gameId: string): Promise<IToken> {
    var game: IGame = await this.gamedb.findOne({ _id: gameId });
    if (!game) throw new HttpException(400, 'Game id is not valid. This token needs a game');

    const token: IToken = await this.tokendb.findByIdAndDelete(tokenId);
    if (!token) throw new HttpException(409, "You're not token");

    return token;
  }
}

export default TokenService;
