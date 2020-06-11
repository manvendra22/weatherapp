/* eslint-disable react/no-multi-comp */
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
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
        time: '12am', temp: 25,
    },
    {
        time: '1pm', temp: 29,
    },
    {
        time: '2pm', temp: 28,
    },
    {
        time: '3pm', temp: 28,
    },
    {
        time: '4pm', temp: 28,
    },
    {
        time: '5pm', temp: 21,
    },
    {
        time: '6pm', temp: 22,
    },
    {
        time: '7pm', temp: 24,
    },
    {
        time: '8pm', temp: 25,
    },
    {
        time: '9pm', temp: 29,
    },
    {
        time: '10pm', temp: 28,
    },
    {
        time: '11pm', temp: 28,
    },
    {
        time: '12am', temp: 28,
    },
    {
        time: '1am', temp: 21,
    },
    {
        time: '2am', temp: 22,
    },
    {
        time: '3am', temp: 24,
    },
    {
        time: '4am', temp: 25,
    },
    {
        time: '5am', temp: 29,
    },
    {
        time: '6am', temp: 28,
    },
    {
        time: '7am', temp: 28,
    },
    {
        time: '8am', temp: 28,
    },
];

function CustomizedAxisTick(props) {
    const {
        x, y, payload,
    } = props;

    let yValue = data.find(val => val.time === payload.value)

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={20} textAnchor="middle" fontSize={14} fontWeight={600} >{yValue.temp}&deg;</text>
            <text dy={40} textAnchor="middle" fill="#666667" fontSize={14} fontWeight={600} >{payload.value}</text>
        </g>
    );
}

export default function MainChart() {
    return (
        <LineChart
            width={1300}
            height={150}
            data={data}
        >
            <CartesianGrid horizontal={false} strokeWidth={2} stroke='#ECECED' />
            <XAxis dataKey="time" tickLine={false} height={50} interval={0} tick={<CustomizedAxisTick />} axisLine={false} />
            <YAxis hide={true} />
            <Line type="monotone" dataKey="temp" stroke="#3CABEB" strokeWidth={3} animationDuration={5000} dot={{ r: 4 }} />
        </LineChart>
    );
}
