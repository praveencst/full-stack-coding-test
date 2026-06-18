import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import { UserController } from './controller/user-controller';
import { User } from './model/user';
import { NotFoundError } from './model/not-found-error';
import { asyncHandler } from './utils/async-handler';


export class App {
    public readonly express: Express;

    private readonly userController: UserController;

    constructor() {
        this.userController = new UserController();

        this.express = express();
        this.express.use(cors());
        this.addRoutes();
        this.addErrorHandler();
    }

    private addRoutes(): void {
        this.express.get('/users', (_request: Request, response: Response) => {
            try {
                const users: User[] = this.userController.getUsers();
                response.status(200).send(users);
            } catch (e) {
                response.status(500).send();
            }
        });

        this.express.get('/user/:id',asyncHandler((request: Request, response: Response) =>{
            const user = this.userController.getUserById(request.params.id);
            response.status(200).send(user);
        }))
    }

    private addErrorHandler():void{
        this.express.use((
            err:Error,
            _request:Request,
            response:Response,
            _next:NextFunction

        ) => {
            if(err instanceof NotFoundError){
                response.status(404).send({error:err.message});
                return;
            }

            console.error(err);
            response.status(500).send({error:'Internal server error'})
        })
    }
}
