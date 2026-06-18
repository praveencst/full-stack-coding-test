import cors from 'cors';
import express, { Express, Request, RequestParamHandler, Response } from 'express';
import { UserController } from './controller/user-controller';
import { User } from './model/user';


export class App {
    public readonly express: Express;

    private readonly userController: UserController;

    constructor() {
        this.userController = new UserController();

        this.express = express();
        this.express.use(cors());
        this.addRoutes();
    }

    private addRoutes(): void {
        type UserQueryParams = { page: string, limit: string};
        this.express.get('/users', (request: Request<{}, {}, {}, UserQueryParams>, response: Response) => {
            try {
                const page: number = parseInt(request.query.page);
                const limit: number = parseInt(request.query.limit);

                if (request.query.page == undefined) {
                    response.status(400).send('<page> must be specified in the query string.');
                } else if (isNaN(page)) {
                    response.status(400).send('<page> must be a number.');
                } else if (request.query.limit == undefined) {
                    response.status(400).send('<limit> must be specified in the query string.');
                } else if (isNaN(limit)) {
                    response.status(400).send('<limit> must be a number.');
                } else {
                    const users: User[] = this.userController.getUsers();

                    const startIndex: number = page * limit;
                    const endIndex: number = startIndex + limit - 1;

                    response.status(200).send({
                        users: users.slice(startIndex, endIndex),
                        pageInfo: {
                            currentPage: page,
                            totalPages: Math.ceil(users.length / limit),
                        },
                    });
                }
            } catch (e) {
                response.status(400).send();
            }
        });
    }
}
