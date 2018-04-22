# PolyChat

A chatting app that supports translation of user messages. Users can select a desired language output, and their messages will be translated to that language. Key phrases in the translated message will also be outputted for the user receiving the messages.

Technologies used:
* NodeJS with:
    * React
    * Redux
    * Express
    * Postgres
* Microsoft Cognitive Services
    * Translator Text API for translating between languages
    * Text Analytics API to identify key phrases

## Setting up the project

### Setting up Postgres and create the app database

We use Postgres for our database management system. If you don't have Postgres, please install and set it up as follows.

1. Download and install Postgres for your OS:
https://www.postgresql.org/download/
2. Check version to make sure you've installed it:
`psql --version`
3. Start the Postgres server in the background:
`postgres -D /usr/local/pgsql/data &`
4. Login to the Postgres shell:
`psql postgres`
5. In `psql`, create the `stackchat` database, which will be used by this app:
`CREATE DATABASE stackchat;`
6. List databases and confirm that `stackchat` is listed:
`\list`
7. Exit `psql` :
`\q` or `Ctrl+D`

### Building and running the app 

* `npm install` or `yarn`
* `npm run seed` or `yarn seed`
* `npm start` or `yarn start`

The `seed` command will generate the database tables for the app and seed them with initial content. You can also use it to wipe the table contents if your chat app gets too cluttered.

The `start` command will run both the `webpack` process (in watch mode) to build you client-side javascript files, and the Node process for your server with `nodemon`.

Once the `start` has been fired, go to `localhost:8080` in your browser of choice to use the app.
