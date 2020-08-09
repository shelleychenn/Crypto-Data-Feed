import React, { Component } from 'react';

class SymbolForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      timeInterval: 'MONTHLY',
      getCached: false,
    };
    this.handleSymbolChange = this.handleSymbolChange.bind(this);
    this.handletimeIntervalChange = this.handletimeIntervalChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeGetCachedState = this.changeGetCachedState.bind(this);
  }

  handleSymbolChange(e) {
    this.setState({
      symbol: e.target.value,
    });
  }

  handletimeIntervalChange(e) {
    this.setState({
      timeInterval: e.target.value,
    });
  }

  changeGetCachedState() {
    this.setState({
      getCached: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getHistoricalDataForSearched(this.state);
    this.setState({
      symbol: '',
      timeInterval: 'MONTHLY',
      getCached: false,
    });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>
            Symbol:
            <input
              className="symbol-input"
              type="type"
              name="symbol"
              value={this.state.symbol}
              placeholder="BTC"
              onChange={this.handleSymbolChange}
            />
          </label>
          <select
            className="drop-down"
            onChange={this.handletimeIntervalChange}
            defaultValue={this.state.timeInterval}
          >
            <option value="MONTHLY" name="timeInterval">
              MONTHLY
            </option>
            <option value="WEEKLY" name="timeInterval">
              WEEKLY
            </option>
            <option value="DAILY" name="timeInterval">
              DAILY
            </option>
          </select>
          Get Cached:
          <label className="switch">
            <input
              type="checkbox"
              checked={this.state.getCached}
              onChange={this.changeGetCachedState}
            />
            <span className="slider round"></span>
          </label>
          <button className="search-button" onClick={this.handleSubmit}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SymbolForm;
