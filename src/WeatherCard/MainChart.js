/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

const data = [
    {
        name: '9 AM', temp: 21,
    },
    {
        name: '10 AM', temp: 22,
    },
    {
        name: '11 AM', temp: 24,
    },
    {
        name: '12 AM', temp: 25,
    },
    {
        name: '1 PM', temp: 29,
    },
    {
        name: '2 PM', temp: 28,
    },
    {
        name: '3 PM', temp: 28,
    },
    {
        name: '4 PM', temp: 28,
    },
    {
        name: '5 PM', temp: 21,
    },
    {
        name: '6 PM', temp: 22,
    },
    {
        name: '7 PM', temp: 24,
    },
    {
        name: '8 PM', temp: 25,
    },
    {
        name: '9 PM', temp: 29,
    },
    {
        name: '10 PM', temp: 28,
    },
    {
        name: '11 PM', temp: 28,
    },
    {
        name: '12 AM', temp: 28,
    },
    {
        name: '1 AM', temp: 21,
    },
    {
        name: '2 AM', temp: 22,
    },
    {
        name: '3 AM', temp: 24,
    },
    {
        name: '4 AM', temp: 25,
    },
    {
        name: '5 AM', temp: 29,
    },
    {
        name: '6 AM', temp: 28,
    },
    {
        name: '7 AM', temp: 28,
    },
    {
        name: '8 AM', temp: 28,
    },
];

function CustomizedAxisTick(props) {
    const {
        x, y, stroke, payload,
    } = props;

    console.log(props)

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666">{payload.value}</text>
        </g>
    );
}

export default function MainChart() {
    return (
        <LineChart
            width={900}
            height={200}
            data={data}
        >
            <CartesianGrid horizontal={false} />
            <XAxis dataKey="name" height={50} tick={<CustomizedAxisTick />} axisLine={false} />
            <YAxis hide={true} />
            <Line type="monotone" dataKey="temp" stroke="#89D3E2" />
        </LineChart>
    );
}
