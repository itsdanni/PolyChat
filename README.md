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

### Install Postgres

We use Postgres for our database management system. If you don't have postgres, please install and set it up.

Here are some guides you can follow:
- https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
- https://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/

You probably don't need to follow these guides in depth; at minimum you just need to install Postgres, activate it, and ensure you can login to it.

### Build and run the project

* `npm install` or `yarn`
* `npm run seed` or `yarn seed`
* `npm start` or `yarn start`

The seed command will create and set up the database for the app. You can confirm that the database exists by logging into the Postgres prompt and entering `\list`. You should see the the `stackchat` database in the results..

The `start` command will run both the `webpack` process (in watch mode) to build you client-side javascript files, and the Node process for your server with `nodemon`.

Once the `start` has been fired, go to `localhost:8080` in your browser of choice to use the app.
