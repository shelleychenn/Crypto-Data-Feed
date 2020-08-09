import React from 'react';
import Entry from './Entry';

var PriceData = ({ data }) => {
  return (
    <div>
      <table className="data-table">
        <thead>
          <tr className="table-entries">
            <th className="date">date</th>
            <th className="open">open</th>
            <th className="high">high</th>
            <th className="low">low</th>
            <th className="close">close</th>
            <th className="volume">volume</th>
            <th className="market-cap">market cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <Entry entry={entry} key={entry.date} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceData;
