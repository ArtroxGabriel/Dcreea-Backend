import { NextFunction, Request, Response } from 'express';
import { CreateStateDto, SearchStateDto } from '@dtos/state.dto';
import { State } from '@interfaces/state.interface';
import stateService from '@services/state.service';

class StatesController {
  public stateService = new stateService();

  /**
   * Gets all states from a given game
   * @param req Request
   * @param res Response
   * @param next Next
   */
  public getStates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateData: SearchStateDto = req.body;
      const findAllStatesData: State[] = await this.stateService.findAllState(stateData.game);

      res.status(200).json(findAllStatesData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Gets a state by Id
   * @param req Request
   * @param res Response
   * @param next Next
   */
  public getStateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const findOneStateData: State = await this.stateService.findStateById(stateId);

      res.status(200).json(findOneStateData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Creates a state inside a given game
   * @param req Request
   * @param res Response
   * @param next Next
   */
  public createState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateData: CreateStateDto = req.body;
      const createStateData: State = await this.stateService.createState(stateData);

      res.status(201).json(createStateData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates a state inside a given game
   * @param req Request
   * @param res Response
   * @param next Next
   */
  public updateState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateData: CreateStateDto = req.body;
      const updateStateData: State = await this.stateService.updateState(stateData);

      res.status(200).json(updateStateData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Deletes a state from a given game
   * @param req Request
   * @param res Response
   * @param next Next
   */
  public deleteState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stateId: string = req.params.id;
      const deleteStateData: State = await this.stateService.deleteState(stateId);

      res.status(200).json(deleteStateData);
    } catch (error) {
      next(error);
    }
  };
}

export default StatesController;
