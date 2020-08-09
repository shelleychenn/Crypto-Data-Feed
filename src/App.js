import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PriceData from './components/PriceData';
import Dashboard from './components/Dashboard';
import SymbolForm from './components/SymbolForm';
import API_KEY from './config/cryptoCompare';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: [],
      symbol: '',
      time: '',
      error: false,
    };
    this.getBTCData = this.getBTCData.bind(this);
    this.getHistoricalDataForSearched = this.getHistoricalDataForSearched.bind(
      this
    );
    this.transformData = this.transformData.bind(this);
  }

  componentDidMount() {
    this.getBTCData();
  }

  getBTCData() {
    axios
      .get(
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&outputsize=compact&apikey=${API_KEY}`
      )
      .then((response) => {
        this.setState({
          priceData: [response.data['Time Series (Digital Currency Daily)']],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getHistoricalDataForSearched(symbolAndTime) {
    axios
      .get(
        `http://localhost:3001/price/${symbolAndTime.symbol}/${symbolAndTime.timeInterval}`,
        {
          params: {
            getCached: symbolAndTime.getCached,
          },
        }
      )
      .then((data) => {
        let timeInt = symbolAndTime.timeInterval;
        let rest = timeInt.slice(1).toLowerCase();
        let string = timeInt[0] + rest;
        let resultData = data.data[`Time Series (Digital Currency ${string})`];

        this.setState({
          priceData: [resultData],
          symbol: symbolAndTime.symbol,
          time: string,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err);
        this.setState({
          error: true,
        });
      });
  }

  transformData(dataObj) {
    let transformed = [];
    for (let key in dataObj) {
      let innerObj = {
        date: key,
        open: dataObj[key]['1a. open (USD)'],
        high: dataObj[key]['2a. high (USD)'],
        low: dataObj[key]['3a. low (USD)'],
        close: dataObj[key]['4a. close (USD)'],
        volumn: dataObj[key]['5. volume'],
        marketCap: dataObj[key]['6. market cap (USD)'],
      };
      transformed.push(innerObj);
    }
    // only returning 30 entries
    return transformed.slice(0, 30);
  }

  render() {
    const topPortion = (
      <div>
        <h1 className="page-header">Crypto Data Feeds</h1>
        <SymbolForm
          className="input-form"
          getHistoricalDataForSearched={this.getHistoricalDataForSearched}
        />
      </div>
    );

    if (this.state.error) {
      return (
        <div>
          {topPortion}
          <h3 className="error-message">
            There's no data found! Try live search!
          </h3>
        </div>
      );
    }
    return (
      <div className="App">
        {topPortion}
        <br />

        <div>
          <Dashboard
            data={this.transformData(this.state.priceData[0])}
            symbol={this.state.symbol}
            time={this.state.time}
          />
          <br />
          <hr className="divider-line" />
          <PriceData data={this.transformData(this.state.priceData[0])} />
        </div>
      </div>
    );
  }
}

export default App;
