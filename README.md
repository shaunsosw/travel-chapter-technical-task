# React Police Data API 

A modern React single page application with Docker containerization.

## Features

- React 18 with Vite
- Docker development and production configurations
- Hot Module Replacement (HMR)
- Modern UI with responsive design

## Prerequisites

- Node.js 20 or later
- Docker and Docker Compose

## Development

To start the development server run either of the following commands ( both must be ran in the root of the directory):

```bash
# Using Docker Compose (recommended) 
docker-compose up

# Or using npm
npm install
npm run dev
```

The development server will be available at http://localhost:3000

## Project Structure

```
.
├── src/               # Source files
├── public/            # Static files
├── Dockerfile         # Production Docker configuration
├── Dockerfile.dev     # Development Docker configuration
├── docker-compose.yml # Docker Compose configuration
└── package.json       # Project dependencies and scripts
```


## Decisions

- App needs to be easy to get up and running locally, used `vite` as the local dev server. It supports HMR (Hot Module Replacement), which is significantly faster than webpack.

- Use react query / tanstack query for calling the Police Data API. Simplifies managing asynchronous state in React apps, especially when fetching, caching, and synchronizing data with a server.

- Used material UI for the frontend styling, for simple to use components, and a consistent responsive design

- Will use a dropdown in the table to get more information on a specific task. 

- Spec says "too show crimes "near" to the following office locations" will assume near means "1 mile radius". We can use poly option on API endpoints to show a specific boundary if needed.


## Considerations

- Could use Typescript in the future for Type safety, and easier collaboration.

- The spec doesn't say to make the application responsive, but will try where we can.  


## Future work

- Could add a DB, and login functionality to add more locations if more offices are opened. 

- No mentions of tests, will add some functional tests, and a docker option to run these, if time allows. Will use jest.


## Tasks:

 - Initital app created using vite and docker to run locally. Estimated time: 2 hours

 - Get data for the state from the police API, 
    need to be able to look for multiple locations, see if the API can support this, instead of 4 seperate calls. Estimated time: 2 hours.

 - Create a clean easy to use page with a table to display all the crimes. Estimated time: 2 hours.

 - Add options to filter and search. Estimated time: 1 hour

 - Add ability to show outcomes. Estimated time: 1 hour


