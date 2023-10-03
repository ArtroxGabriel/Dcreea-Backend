import { RoleDto } from '@dtos/role.dto';
import HttpException from '@exceptions/HttpException';
import { IRole } from '@interfaces/role.interface';
import roleModel from '@models/role.model';
import { isEmpty } from '@utils/util';
import IGame from '@/interfaces/game.interface';
import gameModel from '@/models/game.model';

class RoleService {
  public roledb = roleModel;
  public gamedb = gameModel;

  public async findAllRoles(gameId: string): Promise<IRole[]> {
    const roles: IRole[] = await this.roledb.find({ game: gameId });
    return roles;
  }

  public async findRoleById(roleId: string): Promise<IRole> {
    if (isEmpty(roleId)) throw new HttpException(400, 'Invalid id');

    const role: IRole = await this.roledb.findOne({ _id: roleId });
    if (!role) throw new HttpException(404, 'Role not found');

    return role;
  }

  public async createRole(roleData: RoleDto): Promise<IRole> {
    if (isEmpty(roleData)) throw new HttpException(400, 'Empty role');

    var game: IGame = await this.gamedb.findOne({ _id: roleData.game });
    if (!game) throw new HttpException(400, 'Game id is not valid. This role needs a game');

    const role: IRole = await this.roledb.create(roleData);

    return role;
  }

  public async updateRole(roleId: string, roleData: RoleDto): Promise<IRole> {
    if (isEmpty(roleData)) throw new HttpException(400, "You're not roleData");

    const game: IGame = await this.gamedb.findOne({ _id: roleData.game });
    if (!game) throw new HttpException(400, 'Game id is not valid. This role needs a game');

    const role: IRole = await this.roledb.findByIdAndUpdate(roleId, roleData, { new: true });
    if (!role) throw new HttpException(409, "You're not role");

    return role;
  }

  public async deleteRole(roleId: string, gameId: string): Promise<IRole> {
    var game: IGame = await this.gamedb.findOne({ _id: gameId });
    if (!game) throw new HttpException(400, 'Game id is not valid. This role needs a game');

    const role: IRole = await this.roledb.findByIdAndDelete(roleId);
    if (!role) throw new HttpException(409, "You're not role");

    return role;
  }
}

export default RoleService;
