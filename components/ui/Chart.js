import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function Chart(props) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState('');

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: '#666',
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily: 'sans-serif',
        fontSize: '8px',
        width: '15rem',
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={60}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={index => (index === selected ? 6 : 1)}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}
