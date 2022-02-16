import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { BarChart as Chart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { getFormattedDate, nil, useHoverCallback } from 'utils';

function BarChart({ data, dataKey, onHover, period }) {
  const hoverHandler = useHoverCallback(onHover, dataKey);
  const formatDate = useCallback((date) => getFormattedDate(date, period), [period]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart data={data} onMouseMove={hoverHandler} margin={{ left: 20 }}>
        <defs>
          <linearGradient id="barGradient0" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dd6f4c" />
            <stop offset="50%" stopColor="#6e2a42" />
            <stop offset="70%" stopColor="#40162d" />
            <stop offset="100%" stopColor="#1e0917" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#562b1f" />
            <stop offset="50%" stopColor="#32141d" />
            <stop offset="100%" stopColor="#0c0309" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="date" tickLine={false} axisLine={false} tickFormatter={formatDate} />
        <YAxis type="number" dataKey={dataKey} hide={true} />

        <Tooltip content={nil} cursor={{ fill: '#272224' }} />

        <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
          {data && data.map((entry, i) => <Cell key={i} fill={`url(#barGradient${i % 2})`} />)}
        </Bar>
      </Chart>
    </ResponsiveContainer>
  );
}

BarChart.propTypes = {
  data: PropTypes.any,
  dataKey: PropTypes.string,
  onHover: PropTypes.func,
  period: PropTypes.string,
};

export default memo(BarChart);
