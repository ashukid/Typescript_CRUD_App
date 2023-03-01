import UsersDao from '../daos/users.dao';
import { CreateUserModel } from '../models/create.user.model';
import { PutUserModel } from '../models/put.user.model';

class UsersService {
    async create(resource: CreateUserModel) {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string) {
        return UsersDao.removeUserById(id);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    }

    async putById(id: string, resource: PutUserModel): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }
    async getUserByEmailWithPassword(email: string) {
        return UsersDao.getUserByEmailWithPassword(email);
    }
}

export default new UsersService();
