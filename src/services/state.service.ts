// import bcrypt from 'bcrypt';
import IGame from '@/interfaces/game.interface';
import gameModel from '@/models/game.model';
import { CreateStateDto } from '@dtos/state.dto';
import HttpException from '@exceptions/HttpException';
import { State } from '@interfaces/state.interface';
import stateModel from '@models/state.model';
import { isEmpty } from '@utils/util';

class StateService {
    public stateDB = stateModel;
    public gameDB = gameModel;

    /**
     * Finds all states from a given game
     * @param gameId string
     * @returns Promise<State[]>
     */
    public async findAllState(gameId: string): Promise<State[]> {
        const states: State[] = await this.stateDB.find({ game: gameId });
        return states;
    }

    /**
     * Finds a state by Id
     * @param stateId string
     * @returns Promise<State>
     */
    public async findStateById(stateId: string): Promise<State> {
        if (isEmpty(stateId)) throw new HttpException(400, 'stateId is required');

        const state: State = await this.stateDB.findOne({ _id: stateId });
        if (!state) throw new HttpException(404, 'state not found');

        return state;
    }

    /**
     * Finds a state by label
     * @param stateId string
     * @returns Promise<State>
     */
    public async findStateByLabel(label: string, gameId: string): Promise<State> {
        if (isEmpty(label)) throw new HttpException(400, 'label is required');

        const state: State = await this.stateDB.findOne({ label: label, game: gameId });
        if (!state) throw new HttpException(404, 'state not found');

        return state;
    }

    /**
     * Creates a state inside a game
     * @param stateData CreateStateDto
     * @returns Promise<State>
     */
    public async createState(stateData: CreateStateDto): Promise<State> {
        if (isEmpty(stateData)) throw new HttpException(400, 'this state is not valid');

        if (stateData.label === 'Game Start' || stateData.label === 'Game Over')
            throw new HttpException(400, 'You cant create a "Game Start" or "Game Over" state');

        var game: IGame = await this.gameDB.findById(stateData.game);
        if (!game) throw new HttpException(404, 'Game not found');

        var state: State = await this.stateDB.create(stateData);
        if (!state) throw new HttpException(409, `Another State with same label '${stateData.label}' already exists`);

        state = await this.stateDB.findOne({ game: state.game, label: state.label });

        return state;
    }

    public async createStates(statesData: CreateStateDto[]): Promise<State[]> {
        var gameId = statesData && statesData[0] && statesData[0].game ? statesData[0].game : null;
        if (!gameId) throw new HttpException(400, `game not found`);

        statesData.forEach(st => {
            if (isEmpty(st)) throw new HttpException(400, `state ${st.label} is not valid`);
            if (st.game !== gameId) throw new HttpException(400, `game at state ${st.label} is not valid`);
        });

        var game: IGame = await this.gameDB.findById(gameId);
        if (!game) throw new HttpException(404, 'Game not found');

        const state: State[] = await this.stateDB.insertMany(statesData);
        if (!state) throw new HttpException(409, `Error while creating states`);

        return state;
    }

    /**
     * Updates a state inside a game
     * @param stateId string
     * @param stateData CreateStateDto
     * @returns Promise<State>
     */
    public async updateState(stateData: CreateStateDto): Promise<State> {
        if (isEmpty(stateData)) throw new HttpException(400, 'State empty');

        const initial: State = await this.stateDB.findOne({ game: stateData.game, label: 'Game Start' });
        if (stateData._id == initial._id) {
            if (stateData.label != 'Game Start') throw new HttpException(400, "You cannot change Game Start's label empty");
        }

        const over: State = await this.stateDB.findOne({ game: stateData.game, label: 'Game Over' });
        if (stateData._id == over._id) {
            if (stateData.label != 'Game Over') throw new HttpException(400, "You cannot change Game Over's label empty");
        }

        const state: State = await this.stateDB.findByIdAndUpdate(stateData._id, stateData, { new: true });
        if (!state) throw new HttpException(409, 'A conflict with another state occurred - please, check the label and all other info');

        return state;
    }

    /**
     * Deletes a state from a game
     * @param stateId string
     * @returns Promise<State>
     */
    public async deleteState(stateId: string): Promise<State> {
        var state: State = await this.stateDB.findById(stateId);
        if (!state) throw new HttpException(404, 'State not found');

        if (state.label === 'Game Start' || state.label === 'Game Over')
            throw new HttpException(400, `You can't delete neither "Game Start" or "Game Over" state`);

        // deleting from game
        state = await this.stateDB.findByIdAndDelete(stateId);

        return state;
    }
}

export default StateService;
