import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { getFormattedDate, nil, useHoverCallback } from 'utils';

function LineChart({ data, dataKey, onHover, period }) {
  const hoverHandler = useHoverCallback(onHover, dataKey);
  const formatDate = useCallback((date) => getFormattedDate(date, period), [period]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} onMouseMove={hoverHandler} margin={{ left: 20, right: 5 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#17a887" stopOpacity={0.35} />
            <stop offset="90%" stopColor="#17a887" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="date" tickLine={false} axisLine={false} tickFormatter={formatDate} />
        <YAxis type="number" dataKey={dataKey} hide={true} />

        <Tooltip content={nil} />
        <Area type="basis" dataKey={dataKey} fill="url(#areaGradient)" stroke="#17a887" label={false} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

LineChart.propTypes = {
  data: PropTypes.any,
  dataKey: PropTypes.string,
  onHover: PropTypes.func,
  period: PropTypes.string,
};

export default memo(LineChart);
