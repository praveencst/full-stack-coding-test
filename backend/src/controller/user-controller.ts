import { User } from '../model/user';
import { UserDetails } from '../model/user-details';
import { NotFoundError } from '../model/not-found-error';
import data from '../users.json';

export class UserController {
    private _dataStore: UserDetails[];

    constructor() {
        this._dataStore = [];
        try {
            this._dataStore.push(...data);
        } catch (e) {
            console.error('Failed to load data from <users.json>');
        }
    }

    public getUsers(): User[] {
        return this._dataStore.map(({ id, last_name, first_name }) => ({ id, last_name, first_name }) as User);
    }

    public getUserById(id: string): UserDetails {
        const user = this._dataStore.find(user => user.id === id);
        if(!user){
            throw new NotFoundError(`User with id ${id} not found`)
        }
        return user;
    }
}
