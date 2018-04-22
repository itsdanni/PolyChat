const router = require('express').Router();
const { Message, Author } = require('../db/models');
const translator = require('./utils/translator')

module.exports = router;

// GET api/messages
router.get('/', function (req, res, next) {
  Message.findAll()
    .then(messages => res.json(messages))
    .catch(next);
});

let author;

router.post('/', function (req, res, next) {
  // need to adjust this english setting if for real
  Author.findOrCreate({
    where: {
      name: req.body.name || 'Cody'
    }
  })
  .spread(name => {
    author = name
    return translator.translate(req.body.content, 'fr')
  })
  .then(translatedText => {
    console.log('request body: ', req.body)
    let newMessage = { content: translatedText, name: req.body.name, channelId: req.body.channelId }
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
