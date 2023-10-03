import { Router } from 'express';
import RoleController from '@controllers/role.controller';
import { RoleDto } from '@dtos/role.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RoleRoute implements Route {
  public path = '/role';
  public router = Router();
  public roleController = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.roleController.getRoles);
    this.router.post(`${this.path}/:id`, validationMiddleware(RoleDto, 'body'), this.roleController.createRole);
    this.router.put(`${this.path}/:id`, validationMiddleware(RoleDto, 'body', true), this.roleController.updateRole);
    this.router.delete(`${this.path}/:id`, this.roleController.deleteRole);
  }
}

export default RoleRoute;
