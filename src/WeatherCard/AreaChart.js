/* eslint-disable react/no-multi-comp */
import React from 'react';
import moment from 'moment';

import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

function CustomizedAxisTick(props) {
    const {
        x, y, payload, sunriseTime, sunsetTime
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={20} textAnchor="middle" fill="#666667" fontSize={12} >{payload.value}</text>
        </g>
    );
}

const gradientOffset = (data, sunriseTime, sunsetTime) => {
    const dataMax = Math.max(...data.map(i => i.temp));
    const dataMin = Math.min(...data.map(i => i.temp));

    console.log({ dataMax }, { dataMin })

    if (dataMax <= 20) {
        return 0;
    }
    if (dataMin >= 20) {
        return 1;
    }

    // return 0.5
    return dataMax / (dataMax - dataMin);
};


export default function MainChart(props) {
    const { data = [], selected, sunriseTime, sunsetTime } = props

    const chartData = data.map(value => {
        return {
            time: moment.unix(value.dt).format('ha'), temp: Math.round(value.temp),
        }
    })

    const firstChartData = chartData.filter((value, index) => index < 24)
    const secondChartData = chartData.filter((value, index) => index > 23)

    const mainChartData = selected % 2 === 0 ? firstChartData : secondChartData

    const off = gradientOffset(mainChartData, sunriseTime, sunsetTime);

    return (
        <ResponsiveContainer width='100%' height={150}>
            <AreaChart
                data={mainChartData}
            >
                <XAxis dataKey="time" tickLine={true} height={50} interval={'preserveStartEnd'} tick={<CustomizedAxisTick sunriseTime={sunriseTime} sunsetTime={sunsetTime} />} />
                <YAxis domain={['dataMin', 'auto']} hide={true} />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="#FEE9BB" stopOpacity={1} />
                        <stop offset={off} stopColor="#666667" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area type="basis" dataKey="temp" dot={false} stroke="#FBE2AC" fill="url(#splitColor)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
