# Studio Keeper

Studio Keeper is a web application designed to support artists, makers, and designers manage the business of their creative work.  The application allows users to easily catalog their work, enter contacts, and keep track of events of interest.  The application also provides a gallery view, which allows users to easily share their work.  

Live Link: [Studio Keeper](https://studio-keeper-app.now.sh/)
Client Repo: [Client Repo](https://github.com/sheilajmj/studio-keeper-app)
Api Repo: [API Repo](https://github.com/sheilajmj/studio-keeper-server)



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone https://github.com/sheilajmj/studio-keeper-server.git NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5.  Start the server by entering 'npm run' or 'npm run dev' for the development server (nodemon)

## Dependencies

Step four, of 'Getting Started' (npm install) will install the following dependencies

    aws-sdk: ^2.651.0,
    bcryptjs: ^2.4.3,
    cors: ^2.8.5,
    dotenv: ^8.2.0,
    express: ^4.17.1,
    helmet: ^3.21.2,
    jsonwebtoken: ^8.5.1,
    knex: ^0.20.13,
    md5: ^2.2.1,
    morgan: ^1.9.1,
    multer: ^1.4.2,
    multer-s3: ^2.9.0,
    now: ^17.1.1,
    pg: ^7.18.2,
    postgrator: ^3.11.0,
    postgrator-cli: ^3.3.0,
    uuid: ^7.0.1,
    winston: ^3.2.1,
    xss: ^1.0.6

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Authentication Required Endpoints

Note the authentication piece is not fully developed.  Any user/password once created will access all data.


        [Catalog Related Endpoints](./catalog.md): 
            * /api/catalog   GET, POST
            * api/catalog/id  GET, PATCH, DELETE

        [Contacts Related Endpoints](./contacts.md):
            * /api/contacts     GET, POST
            * /api/contacts/id   GET, PATCH, DELETE

        [Events Related Endpoints](./events.md):
            * /api/events    GET, POST
            * /api/events/id     GET, PATCH, DELETE

        [Catalog Images Related Endpoints](./images.md): 
            * /api/catalogimages  GET, POST


## Running the tests

To run the tests use the script "npm tests"


## Built With

* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/) - Framework
* [Knex](http://knexjs.org/) - SQL Query Builder 
* [Postgres](https://www.postgresql.org/) - Relational Database 
* [Mocha](https://mochajs.org/) - Test Framework
* [AWS S3](https://aws.amazon.com/s3/) - Storage Service
* [Multer](https://www.npmjs.com/package/multer) - Middleware for Handling Multipart/Form-Data 

### Notes:

    * Note the authentication piece is not fully developed.  Any user/password, once created will access all data.

    * Endpoints currently in development include: 
        ** /api/catalogcontacts
        ** /api/catalogevents
        ** /api/contactsevents
        These endpoints are being built to access junction tables to retrieve the relationships.  

