const router = require('express').Router();
const { Message, Author } = require('../db/models');
var builder = require('botbuilder');
var translator = require('./utils/translator');

module.exports = router;

const connector = new builder.ChatConnector({
    appId: '49e1a163-72ac-4d6e-8c1d-9477be96de2c',
    appPassword: 'c;s87jZz39:Q!=g['
});

const bot = new builder.UniversalBot(connector, function (session) {

    const text = session.message.text;
    const targetLanguage = "fr-fr";
    console.log("Text received by bot: ", text);

    // Testing
    //translator.translate(text, "fr-fr").then((translatedText) => console.log(translatedText));
    return Promise.resolve(translator.translate(text, targetLanguage))
        .then((translatedText) => {
            console.log("Text sent by bot: ", translatedText);
            session.send("You said: %s", translatedText);
        });
});
// POST /api/messages
router.post('/', function (req, res, next) {
  console.log('request body: ', req.body)
  connector.listen()
});


