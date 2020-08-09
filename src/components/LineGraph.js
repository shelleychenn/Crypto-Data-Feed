import React, { Component } from 'react';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";

//Setting the tension to 0 removes the smooth curves in graph. Optionally, can set the value to 0.1 or 0.2 to get a slight tension curve.
Chart.defaults.global.elements.line.tension = 0;

class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  chartRef = React.createRef();

  static getDerivedStateFromProps(props, state) {
    const {
      priceData: { close, date, high, low, marketCap, open, volume },
    } = props;

    return {
      close,
      date,
      high,
      low,
      marketCap,
      open,
      volume,
    };
  }

  componentDidMount() {
    this.myChartRef = this.chartRef.current.getContext('2d');

    this.updateChart();
  }

  updateChart = () => {
    if (this.newChart) {
      this.newChart.destroy();
    }
    this.newChart = new Chart(this.myChartRef, {
      type: 'line',
      data: {
        labels: this.state.date,
        datasets: [
          {
            label: 'open',
            data: this.state.open,
            fill: false,
            borderColor: '#6ad431',
          },
          {
            label: 'high',
            data: this.state.high,
            fill: false,
            borderColor: '#2966cf',
          },
          {
            label: 'low',
            data: this.state.low,
            fill: false,
            borderColor: '#d12e1f',
          },
          {
            label: 'close',
            data: this.state.close,
            fill: false,
            borderColor: '#2a302b',
          },
        ],
      },
      options: {
        //Customize chart options
        layout: {
          padding: {
            top: 5,
            left: 15,
            right: 15,
            bottom: 15,
          },
        },
        scales: {
          xAxes: [
            {
              //ticks: { display: false },
              gridLines: {
                display: true,
                drawBorder: true,
              },
            },
          ],
          yAxes: [
            {
              //ticks: { display: false },
              gridLines: {
                display: true,
                drawBorder: true,
              },
            },
          ],
        },
      },
    });

    this.newChart.update();
  };

  render() {
    if (this.newChart && this.chartRef) {
      this.updateChart();
    }
    return (
      <div className={classes.graphContainer}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default LineGraph;
