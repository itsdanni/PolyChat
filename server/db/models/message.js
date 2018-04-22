const Sequelize = require('sequelize');
const db = require('../db');
const Author = require('./author');

module.exports = db.define('message', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  language: {
    type: Sequelize.STRING,
    defaultValue: 'en'
  }
}, {
  defaultScope: {
    include: [
      { model: Author }
    ]
  }
});
