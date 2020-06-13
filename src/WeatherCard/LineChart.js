import React from 'react';
import moment from 'moment';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';

function CustomizedAxisTick(props) {
    const {
        x, y, payload, chartData
    } = props;

    let yValue = chartData.find(val => val.time === payload.value)

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={20} textAnchor="middle" fontSize={14} fontWeight={500} >{yValue.temp}&deg;</text>
            <text dy={40} textAnchor="middle" fill="#666667" fontSize={14} fontWeight={500} >{payload.value}</text>
        </g>
    );
}

export default function MainChart(props) {
    const { data = [], selected } = props

    const chartData = data.map(value => {
        return {
            time: moment.unix(value.dt).format('ha'), temp: Math.round(value.temp),
        }
    })

    const firstChartData = chartData.slice(0, 24)
    const secondChartData = chartData.slice(24, 48)

    const mainChartData = selected % 2 === 0 ? firstChartData : secondChartData

    return (
        <LineChart
            width={1300}
            height={160}
            margin={{ top: 10, left: 20, right: 20, bottom: 5 }}
            data={mainChartData}
        >
            <CartesianGrid horizontal={false} strokeWidth={2} stroke='#ECECED' />
            <XAxis dataKey="time" tickLine={false} height={50} interval={0} tick={<CustomizedAxisTick chartData={mainChartData} />} axisLine={false} />
            <YAxis domain={['dataMin', 'auto']} hide={true} />
            <Line type="natural" dataKey="temp" stroke="#3CABEB" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
    );
}
