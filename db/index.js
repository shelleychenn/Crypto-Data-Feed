const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cryptoprice', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', () => {
  console.log('database connection error!');
});
db.once('open', () => {
  console.log('database connected!');
});

module.exports = db;
