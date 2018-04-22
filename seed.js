const db = require('./server/db');
const Author = require('./server/db/models/author');
const Message = require('./server/db/models/message');
const Channel = require('./server/db/models/channel');

const channels = [
  { name: 'hackchella' },

  { name: 'just_good_dogs' },
{ name: 'what\'s for lunch' },
  { name: 'totallyRandom' }
];

const authors = [{
  name: 'Cody',
  image: '/images/cody.jpg'
}, {
  name: 'Ben',
  image: '/images/ben.jpg'
}, {
  name: 'Star',
  image: '/images/star.jpg'
}, {
  name: 'Batman',
  image: '/images/batman.jpg'
}, {
  name: 'Elliott',
  image: '/images/elliott.jpg'
}, {
  name: 'Fira',
  image: '/images/fira.jpg'
}, {
  name: 'Henry',
  image: '/images/henry.jpg'
}, {
  name: 'Marcy',
  image: '/images/marcy.jpg'
}, {
  name: 'Milton',
  image: '/images/milton.jpg'
}, {
  name: 'Murphy',
  image: '/images/murphy.jpg'
}, {
  name: 'Raffi',
  image: '/images/raffi.jpg'
}, {
  name: 'Tulsi',
  image: '/images/tulsi.jpg'
}, {
  name: 'Pork Chop',
  image: '/images/pork_chop.jpg'
}, {
  name: 'Ribs',
  image: '/images/ribs.jpg'
}, {
  name: 'Stacey',
  image: '/images/stacey.jpg'
}, {
  name: 'JD',
  image: '/images/jd.jpg'
}, {
  name: 'BenBen',
  image: '/images/benben.png'
}, {
  name: 'Odie',
  image: '/images/odie.jpg'
}];

const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const messages = [
  { authorId: id(), content: 'I love challenges!', channelId: 1 },
  { authorId: id(), content: 'I love hacking!', channelId: 1 },
  { authorId: id(), content: 'I love prizes!', channelId: 1 },
  { authorId: id(), content: 'dogs are cool!', channelId: 3 },
  { authorId: id(), content: 'I saw a dog today', channelId: 3 },
  { authorId: id(), content: 'DOOOOGS', channelId: 3 },
  { authorId: id(), content: 'Free food!', channelId: 2 },
  { authorId: id(), content: 'We have pizza!', channelId: 2 },
  { authorId: id(), content: 'Are we doing toppings contest?', channelId: 2 },
  { authorId: id(), content: 'yay!', channelId: 4 },
  { authorId: id(), content: 'wow!', channelId: 4 },
  { authorId: id(), content: 'what?', channelId: 4 }
];

const seed = () =>
  Promise.all(authors.map(author =>
    Author.create(author))
  )
  .then(() =>
  Promise.all(channels.map(channel =>
    Channel.create(channel))
  ))
  .then(() =>
  Promise.all(messages.map(message =>
    Message.create(message))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
