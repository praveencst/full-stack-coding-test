import { Express } from 'express';
import request from 'supertest';
import { App } from '../../src/app';
import { User } from '../../src/model/user';
import { UserDetails } from '../../src/model/user-details';
import { describe } from 'node:test';

let app: Express;

beforeAll(() => {
    app = new App().express;
});

describe('/users', () => {
    it('should return an array of Users', async () => {
        const response = await request(app).get('/users');

        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect((response.body[0] as User).id).toBeDefined();
    });
});

describe('/user/:id', () =>{
    it('should return user details when user exists', async () => {
        const usersResponse = await request(app).get('/users');
        const userId = (usersResponse.body[0] as User).id;

        const response = await request(app).get(`/user/${userId}`);
        const user = response.body as UserDetails;

        expect(response.status).toEqual(200);
        expect(user.id).toEqual(userId);
        expect(user.first_name).toBeDefined();
        expect(user.last_name).toBeDefined();
        expect(user.email).toBeDefined();
        expect(user.favourites).toBeDefined();
    });

    
    it('should return 404 when user does not exists', async () => {
        const response = await request(app).get('/user/invalid-id');

        expect(response.status).toEqual(404);
        expect(response.body.error).toBeDefined();
    });  
    
    
    it('should return 404 when id is empty string', async () => {
        const response = await request(app).get('/user/');

        expect(response.status).toEqual(404);
    });     

});
