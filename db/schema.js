const mongoose = require('mongoose');
const db = require('./index');
mongoose.Promise = global.Promise;

const entrySchema = new mongoose.Schema({
  symbol: String,
  interval: String,
  data: String,
});

const TimeSeries = mongoose.model('TimeSeries', entrySchema);

module.exports = TimeSeries;
