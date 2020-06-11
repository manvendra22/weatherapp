/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

const data = [
    {
        time: '9am', temp: 21,
    },
    {
        time: '10am', temp: 22,
    },
    {
        time: '11am', temp: 24,
    },
    {
        time: '12am', temp: 26,
    },
    {
        time: '1pm', temp: 29,
    },
    {
        time: '2pm', temp: 29,
    },
    {
        time: '3pm', temp: 29,
    },
    {
        time: '4pm', temp: 28,
    },
    {
        time: '5pm', temp: 27,
    },
    {
        time: '6pm', temp: 26,
    },
    {
        time: '7pm', temp: 25,
    },
    {
        time: '8pm', temp: 24,
    },
    {
        time: '9pm', temp: 24,
    },
    {
        time: '10pm', temp: 23,
    },
    {
        time: '11pm', temp: 22,
    },
    {
        time: '12am', temp: 20,
    },
    {
        time: '1am', temp: 19,
    },
    {
        time: '2am', temp: 17,
    },
    {
        time: '3am', temp: 17,
    },
    {
        time: '4am', temp: 16,
    },
    {
        time: '5am', temp: 16,
    },
    {
        time: '6am', temp: 17,
    },
    {
        time: '7am', temp: 20,
    },
    {
        time: '8am', temp: 20,
    },
];

function CustomizedAxisTick(props) {
    const {
        x, y, payload,
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={20} textAnchor="middle" fill="#666667" fontSize={12} >{payload.value}</text>
        </g>
    );
}

const gradientOffset = () => {
    const dataMax = Math.max(...data.map(i => i.temp));
    const dataMin = Math.min(...data.map(i => i.temp));

    if (dataMax <= 20) {
        return 0;
    }
    if (dataMin >= 20) {
        return 1;
    }

    return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

export default function MainChart() {
    return (
        <ResponsiveContainer width='100%' height={150}>
            <AreaChart
                data={data}
            >
                <XAxis dataKey="time" tickLine={false} height={50} interval={0} tick={false} />
                <YAxis domain={[20, 'auto']} hide={true} />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1} />
                        <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="temp" stroke="#3CABEB" strokeWidth={3} animationDuration={5000} dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
