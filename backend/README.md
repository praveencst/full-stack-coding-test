# Programming Test - Backend

## Description
For this portion of the test, you will be extending an existing REST API. We do not want you to re-architect or refactor the app.

The REST API we have provided has a single endpoint (`GET /users`) that serves an array of randomly generated user data as a JSON array.

## Instructions
1. Complete the below task on your branch

## Task
For this portion, we want you to add a new route that responds to the following request with the given user's details in JSON format:
```
GET /user/<user_id>
```
```
Example:
GET /user/8a21a9f0-c692-4710-9faa-ee08ca4fc03c

Response:
{
    "id": "8a21a9f0-c692-4710-9faa-ee08ca4fc03c",
    "first_name": "Sample",
    "last_name": "Name",
    "email": "sample@name.com",
    "favourites": [
        "Pear"
    ]
}
```

## What we're looking for
* Completion of the task
* A deep understanding of your changes
* A general understanding of the codebase (excluding libraries)
* Clean git commits
* Suitable error handling
* Automated tests

## Useful Notes

### Tech Stack
This project uses **NodeJS** as the platform.

**Npm** is used to manage dependencies, configuration, and build scripts.

**Express v4** is used for the backend API framework.

**Typescript** is used as the development language.

**Jest** and **Supertest** are used for automated API testing.

### Build Commands
From this directory, run `npm install` to install all dependencies.

Run `npm run build` to build the project. The output can be found in the `/dist` directory.

Run `npm run start` to host a local development server on port 3000. This will run what ever is in the `/dist` directory when it is run. You will need to re-run the `build` and `start` commands to see changes. Alternatively you can add a `watch` command to handle this for you.

Run `npm run test` to run the automated tests. These can be found in the `/test` directory. 

## New Endpoint

### Get User By Id
Returns the details of a specific user based on the provided user ID.

### Endpoint
```
GET /user/<user_id>
```
### Example Request

```
Example:
GET /user/8a21a9f0-c692-4710-9faa-ee08ca4fc03c

Response:
{
    "id": "8a21a9f0-c692-4710-9faa-ee08ca4fc03c",
    "first_name": "Sample",
    "last_name": "Name",
    "email": "sample@name.com",
    "favourites": [
        "Pear"
    ]
}
```

### Error Handling
If the specified user does not exist, the API returns: 404 Not Found

```
{"error":"User with id 15a21a9f0-c692-4710-9faa-ee08ca4fc03a  not found"}
```

### Tests
The test suite includes coverage for:
- `GET /user/:userId`
    - Returns a user when a valid ID is provided
    - Returns 404 when user does not exist
    - Returns 404 when user id is empty string

