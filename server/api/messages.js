const router = require('express').Router();
const { Message, Author } = require('../db/models');
const translator = require('./utils/translator');
const analyzer = require('./utils/analyzer');

module.exports = router;

// GET api/messages
router.get('/', function (req, res, next) {
  Message.findAll()
    .then(messages => res.json(messages))
    .catch(next);
});

let author;

router.post('/', function (req, res, next) {
  let authorName = req.body.name;
  let inputMessage = req.body.content;
  let targetLanguage = req.body.language;

  Author.findOrCreate({
    where: {
      name: authorName || 'Cody'
    }
  })
  .spread(name => {
    author = name;
    return translator.translate(inputMessage, targetLanguage);
  })
  .then(translatedText => {
    console.log("IN MESSAGE.JS: Translated text: ", translatedText);

    // Prepare JSON for analytics
    const documents = {
        'documents': [
            { 'id': '0', 'language': targetLanguage, 'text': translatedText }
        ]
    };
    return analyzer.analyze('keyPhrases', documents)
        .then(keyPhrases => {
            console.log("IN MESSAGES.JS: Key phrases object: ", JSON.stringify(keyPhrases, null, '  '));
            const keyPhrases_asString = keyPhrases.documents[0].keyPhrases.join(', ');
            //console.log(`${translatedText}`)
            //console.log(`Key phrases: ${keyPhrases_asString}`);
            const message = `${translatedText} (KEY PHRASES: ${keyPhrases_asString})`;
            return message;
        })
        // If analytics fails, then we want to just display translated text
        .catch(err => translatedText);
  })
  .then(messageToSend => {
    let newMessage = { content: messageToSend, name: req.body.name, channelId: req.body.channelId, language: req.body.language }
      const message = Message.build(newMessage);
      message.setAuthor(author, { save: false });
      return message.save()
        .then(message => {
          message = message.toJSON();
          message.author = author;
          return message;
        });
    })
    .then(message => {
      res.json(message);
    })
    .catch(next);
  }
);

// PUT /api/messages
router.put('/:messageId', function (req, res, next) {
  const messageId = req.params.messageId;

  Message.findById(messageId)
    .then(message => message.update(req.body))
    .catch(next);
});

// DELETE /api/messages
router.delete('/:messageId', function (req, res, next) {
  const id = req.params.messageId;

  Message.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
