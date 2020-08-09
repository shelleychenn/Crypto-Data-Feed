const axios = require('axios');
const TimeSeries = require('../db/schema');
const API_KEY = require('../config/cryptoCompare');

const controller = {};

controller.get = (req, res) => {
  if (req.query.getCached === 'true') {
    console.log(req.query);
    return controller.getCached(req, res);
  } else {
    return controller.getLiveAndSave(req, res);
  }
};

controller.getLiveAndSave = (req, res) => {
  let symbol = req.params.symbol;
  let interval = req.params.timeInterval;
  console.log(symbol);
  console.log(interval);
  axios
    .get(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_${interval}&symbol=${symbol}&market=USD&outputsize=compact&apikey=${API_KEY}`
    )
    .then((data) => {
      let newData = new TimeSeries({
        symbol: symbol,
        interval: interval,
        data: JSON.stringify(data.data),
      });
      console.log(data);

      TimeSeries.findOneAndUpdate(
        { symbol: symbol, interval: interval },
        { data: newData.data },
        {
          new: true,
          upsert: true,
        }
      )
        .then(() => {
          console.log('new data saved to database!');
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

controller.getCached = (req, res) => {
  let symbol = req.params.symbol;
  let interval = req.params.timeInterval;

  TimeSeries.findOne({ symbol: symbol, interval: interval })
    .then((data) => {
      console.log(data);
      if (data) {
        res.status(200).json(JSON.parse(data.data));
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = controller;
