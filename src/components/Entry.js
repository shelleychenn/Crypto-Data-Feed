import React from 'react';

var Entry = ({ entry }) => {
  return (
    <tr className="table-entries">
      <td className="date">{entry.date}</td>
      <td className="open">{entry.open}</td>
      <td className="high">{entry.high}</td>
      <td className="low">{entry.low}</td>
      <td className="close">{entry.close}</td>
      <td className="volume">{entry.volumn}</td>
      <td className="market-cap">{entry.marketCap}</td>
    </tr>
  );
};

export default Entry;
