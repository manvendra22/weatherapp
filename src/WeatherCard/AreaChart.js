/* eslint-disable react/no-multi-comp */
import React from 'react';
import moment from 'moment';
import suncalc from 'suncalc'

import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

function CustomizedAxisTick(props) {
    const {
        x, y, index, payload
    } = props;

    let anchor = ['start', 'middle', 'end']

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={10} textAnchor={anchor[index]} fill="#666667" fontSize={12} fontWeight={500} >{payload.value}</text>
        </g>
    );
}

export default function MainChart(props) {
    const { data = [], lat, lon, selected, sunrise, sunset } = props

    const chartData = data.map(element => {
        let time = moment.unix(element.dt)
        let position = suncalc.getPosition(time, lat, lon)

        return {
            time: time.format('ha'),
            altitude: position.altitude,
            actualTime: time.format('HH')
        }
    });

    const firstChartData = chartData.slice(0, 24)
    const secondChartData = chartData.slice(24, 48)

    const mainChartData = selected % 2 === 0 ? firstChartData : secondChartData

    const ticksData = [mainChartData[0].time, mainChartData[12].time, mainChartData[23].time]

    console.log({ mainChartData }, sunrise, sunset)

    return (
        <ResponsiveContainer width='100%' height={150}>
            <AreaChart
                data={mainChartData}
                margin={{ top: 5, left: 20, right: 20, bottom: 5 }}
            >
                <XAxis dataKey="time" height={50} ticks={ticksData} tick={<CustomizedAxisTick />} tickSize={15} axisLine={false} />
                <YAxis hide={true} />
                <Area type="basis" dataKey="altitude" dot={false} stroke="#FBE2AC" fill="#FBE2AC" fillOpacity={0.8} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
