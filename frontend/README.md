# Programming Test - Frontend

## WARNING
Ensure you have completed task 1 (backend) before starting this task. If you were unable to complete task 1, please reach out to your interviewers for a workaround.

For this task you will need to have the backend server running on `localhost:3000` for the frontend to make requests to it.

## Description
For this portion of the test, you will be filling in an empty view using data from the route you added in task 1. Once again, we do not want you to re-architect or refactor the app.

The view will need to fetch data from a single endpoint (`GET /user/<user_id>`) that serves randomly generated user data as a JSON object.

## Instructions
1. Complete the below task on your branch

## Task
For this portion, we want you to implement a view presenting the details for a given user. The minimal shell of this view can be found in `src/views/UserDetailView.vue`.

You will need to display all information for that user;
* Id
* Last name
* First name
* Email
* A list of favourites

We want you to make use of a loop (or similar) to present the favourites.

You may create any layout you wish, and can create custom components if needed. We ask that you do not use any pre-made component libraries.

## What we're looking for
* Completion of the task
* A deep understanding of your changes
* A general understanding of the codebase (excluding libraries)
* Clean git commits
* Suitable error handling

## Useful Notes

### Tech Stack
This project uses **NodeJS** as the platform.

**Npm** is used to manage dependencies, configuration, and build scripts.

**Vue** is used for the frontend framework in **SPA** mode. The **single-file component (SFC)** approach is used for views and components.

**Typescript** is used as the development language.

### Build Commands
From this directory, run `npm install` to install all dependencies.

Run `npm run build` to run type-checking and build the project.

Run `npm run dev` to host a local development server on port 5173. This will watch for any changes are rebuild for you.

## Implementation Notes

### Configuration
The backend API base URL is configured via environment variable for flexibility across environments.

To configure locally:
```bash
cp .env.example .env
```
Change the API URL in the `.env file`  `VITE_API_BASE_URL=http://localhost:3000`

## UserDetailView Implementation

- Fetches user data from GET `<API_BASE_URL>/user/<user_id>`
- Displays all required fields: Id, Last Name, First Name, Email, Favourites
- Missing or empty fields render as -
