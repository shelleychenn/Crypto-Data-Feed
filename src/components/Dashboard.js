import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import LineGraph from './LineGraph';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getAllPrices = this.getAllInfo.bind(this);
  }

  getAllInfo(data) {
    let result = {
      date: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volumn: [],
      marketCap: [],
    };

    for (let key in data) {
      result.date.push(data[key].date);
      result.open.push(data[key].open);
      result.high.push(data[key].high);
      result.low.push(data[key].low);
      result.close.push(data[key].close);
      result.volumn.push(data[key].volumn);
      result.marketCap.push(data[key].marketCap);
    }
    return result;
  }

  render() {
    if (this.props.data && this.props.data.length) {
      return (
        <div className="classes-container">
          <header>
            <h2 className="chart-title">
              Historical Time Series: {this.props.symbol} - {this.props.time}
            </h2>
          </header>
          <LineGraph priceData={this.getAllInfo(this.props.data)} />
        </div>
      );
    }
    return <h2>Loading...</h2>;
  }
}

export default Dashboard;
