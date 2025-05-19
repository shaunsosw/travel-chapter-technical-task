# React Police Data API 

A modern React single page application (SPA) with Docker containerization. 
This application was built to view all crimes close to the office locations of Travel Chapter Ltd.
It uses the Police API for street level crime,  available at https://data.police.uk/docs/method/crime-street/. The SPA is built to be used on desktops. 

![GIF of application](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzN4NDllMXNzeDhsZmlieHZoN2VmZHBudGszZno4YnN1eThxdXN6bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JsxzsugoPh25cy3UFK/giphy.gif)

## Features

- React 18 with Vite
- Docker development and production configurations
- Hot Module Replacement (HMR)
- Modern UI with responsive design

## Prerequisites

- Node.js lts or later
- Docker and Docker Compose https://docs.docker.com/compose/install/

## Development

To start the development server run either of the following commands ( both must be ran in the root of the directory):

```bash
# Using Docker Compose (recommended) 
docker compose up
# Using older Compose command:
docker-compose up

# Or using npm
npm install
npm run dev
```

The development server will be available at http://localhost:3000

## Tests
Tests can be ran by running:

```bash
# Using Docker Compose (recommended) 
docker compose run test
# Using older Compose command:
docker-compose run test

# Or using npm
npm install
npm test --watchAll=false
```


## Decisions

* App needs to be easy to get up and running locally, used `vite` as the local dev server. It supports HMR (Hot Module Replacement), which is significantly faster than webpack.

* Use react query / tanstack query for calling the Police Data API. Simplifies managing asynchronous state in React apps, especially when fetching, caching, and synchronizing data with a server.

* Used material UI for the frontend styling, for simple to use components, and a consistent responsive design

* Will use a dropdown in the table to get more information on a specific crime. 

* Spec says "too show crimes "near" to the following office locations" will assume near means "1 mile radius". We can use poly option on API endpoints to show a specific boundary if needed.

* In the police API "fetchCrimes" call, the data isn't up to date, it is a couple of months behind. This means our filter on the frontend needs to not allow months that aren't available. On the call without a month set it is the latest data. We should get the latest month from this. 

* If one location query fails we should still show some data if the other queries succeed.

* Added pagingation to the table using material-ui TablePagination, application is faster, and easier to control as a user. Also added a way to 


## Considerations

* Could use Typescript in the future for Type safety, and easier collaboration.

* The spec doesn't say to make the application responsive, but will try where we can.  

* Could use a CSS preprocessing tool like SASS, but given the small size we won't need variables and nesting. Maybe if the application needs to scale.



## Future work

* Would add a DB, login functionality and admin section to add more locations if more offices are opened. 

* No mentions of tests, will add some functional tests, and a docker option to run these, if time allows. Will use jest.

* There is rate limiting in place on this API. The current rate limit is 15 requests per second with a burst of 30. To reduce the chance of errors we could build a microservice (API Gateway) to cache and decode the response into only the fields that we need. 

* React Query refetches data from the police API when the page is reloaded, as the cache lives in Javascript memory. Could use react-query-persist-client to persist the cache in localStorage. 

* Would add CI/CD to; install dependencies, run the build, and run tests. Would use something like CircleCI or Github Actions

* Add google map to show the location of the crime when clicking the dropdown. 

* Add jsdoc for readability on functions. 

* Table is really difficult to display data on a mobile device. The tables data is too large to see scrollbar. We could:
    * Use a card layout if the user is on mobile, instead of the table view.
    * Hide certain columns such as category. And allow to be collapsible for more information.


## Tasks:

 * ~~Initital app created using vite and docker to run locally. Estimated time: 2 hours~~

 * ~~Get data for the state from the police API, need to be able to look for multiple locations, see if the API can support this, instead of 4 seperate calls. Estimated time: 2 hours.~~

 * ~~Create a clean easy to use page with a table to display all the crimes using material-ui. Estimated time: 2 hours.~~

 * ~~Add options to filter and search. Estimated time: 1 hour~~

 * ~~Add ability to show outcomes. Estimated time: 2 hours~~

 * ~~Add tests. Estimated time: 1-2 hours~~


