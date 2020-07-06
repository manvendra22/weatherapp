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
            <text dy={20} textAnchor="middle" fill="var(--color-text-primary)" fontSize={14} fontWeight={500}>{yValue.temp}&deg;</text>
            <text dy={40} textAnchor="middle" fill="var(--color-text-secondary)" fontSize={14} fontWeight={500} >{payload.value}</text>
        </g>
    );
}

export default function WeatherChart(props) {
    const { data = [] } = props

    const chartData = data.map(value => {
        return {
            time: moment.unix(value.dt).format('ha'), temp: Math.round(value.temp),
        }
    })

    return (
        <>
            <div className="secondaryTextColor">
                48 Hours Forecast
            </div>
            <div className="mainChart">
                <LineChart
                    width={2600}
                    height={160}
                    margin={{ top: 15, left: 20, right: 20, bottom: 5 }}
                    data={chartData}
                >
                    <CartesianGrid horizontal={false} strokeWidth={2} stroke='#ECECED' />
                    <XAxis dataKey="time" tickLine={false} height={50} interval={0} tick={<CustomizedAxisTick chartData={chartData} />} axisLine={false} />
                    <YAxis domain={['dataMin', 'auto']} hide={true} />
                    <Line type="natural" dataKey="temp" stroke="#3CABEB" strokeWidth={3} dot={{ r: 5 }} isAnimationActive={false} />
                </LineChart>
            </div>
        </>
    );
}
