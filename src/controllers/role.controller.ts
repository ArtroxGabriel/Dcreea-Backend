import { NextFunction, Request, Response } from 'express';
import { RoleDto } from '@dtos/role.dto';
import { IRole } from '@interfaces/role.interface';
import roleService from '@services/role.service';

class RolesController {
  public roleService = new roleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gameId: string = req.params.id;
      const findAllRolesData: IRole[] = await this.roleService.findAllRoles(gameId);

      res.status(200).json(findAllRolesData);
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const findOneRoleData: IRole = await this.roleService.findRoleById(roleId);

      res.status(200).json(findOneRoleData);
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: RoleDto = req.body;
      const createRoleData: IRole = await this.roleService.createRole(roleData);

      res.status(201).json(createRoleData);
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const roleData: RoleDto = req.body;
      const updateRoleData: IRole = await this.roleService.updateRole(roleId, roleData);

      res.status(200).json(updateRoleData);
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const gameId: string = req.body.game;

      const deleteRoleData: IRole = await this.roleService.deleteRole(roleId, gameId);

      res.status(200).json(deleteRoleData);
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;
