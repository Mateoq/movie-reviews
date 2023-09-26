# Movie Reviews
This simple app allows users to rate a variety of movies from 0 to 10. It consist of two components:
- Services
- Client

The whole project is structured using `yarn` workspaces as a monorepo. `Yarn` takes care of the dependencies and scripts.

---
## Setup
**Requirements:**
- Node v18
- Yarn

Install dependencies for both apps running in the terminal:
```sh
yarn install
```

Before running both apps, change the name of the files:
- `.env-example` to `.env` in the `/services` folder.
- `.env.local-example` to `.env.local` in the `/client` folder.

The run the next command to start the dev instances for NestJS and NextJS:
```sh
yarn start:dev
```

If everything goes well you can access:
- Services: `http://localhost:3001`
- Client: `http://localhost:3000`

---
## Services
This component exposes the main API that connects to the PostgreSQL database. These are the dependencies:
- NestJS
- TypeORM
- Typescript

### Entities:
In order to provide the endpoints the services have two entities :
- `Movie:` This one's the main entity that contains the minimal information of each movie.
- `Review:` This one contains the the information of a movie review.

### Modules:
For the `Movies`'s module, it exposes two endpoints:
- `[GET] /movies`: Responds with the list of all the movies in database
- `[GET] /movies/{id}`: Responds with the data of a specific movie based on the database ID.

The `Reviews`'s module exposes three endpoints:
- `[GET] /reviews`: Responds with a list of all the reviews.
- `[GET] /reviews/{id}`: Responds with the data of a single review based on the database id.
- `[POST] /reviews`: Creates a new review and responds with its data. To test this endpoint you must send the next structure in the body:
  ```json
    {
      "username": "string",
      "rating": "number",
      "movieId": "uuid"
    }
  ```
  The movieId must be the one in the database.

### Docs
To access the API docs just use the url `/docs` and there you can see the swagger documentation of the API.

### Database
The database is a PostgreSQL instance running on AWS, all data is already there and the reason for not having a local instance was due to hardware limitations, but all the credentials should be in the `.env` file located in the `services` app.

---
## Client
This component provides a UI for the user to see the list of Movies and submit Reviews using a form. These are the dependencies:
- NextJS
- ChakraUI
- React Query

### Routes
It has two routes:
- `/`: This one renders all the movies.
- `/movies/{id}`: This one renders the details of a movie with its reviews and the form to submit new reviews.

### Components:
Almost all components come from the Chakra UI library, but there are three custom components:
- `<MovieCard>`: This one renders image and title of the movie and it represents a link to the Movie details page.
- `<MovieDetails>`: This component renders the detail info of the movie along with a table of ratings and the review form.
- `<ReviewForm>`: This one contains a form for the user to submit a new review for a particular movie.
