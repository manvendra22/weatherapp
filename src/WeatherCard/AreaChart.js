/* eslint-disable react/no-multi-comp */
import React from 'react';
import moment from 'moment';

import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

function CustomizedAxisTick(props) {
    const {
        x, y, payload
    } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={20} textAnchor="middle" fill="#666667" fontSize={12} >{payload.value}</text>
        </g>
    );
}

export default function MainChart(props) {
    const { data = [], selected, sunrise, sunset } = props

    let initialDegree = -90
    let initialTime = 0
    let newdata = []

    for (let i = 0; i < 24; i++) {
        newdata.push({
            time: initialTime, degree: initialDegree
        })

        initialDegree += 15
        initialTime += 1
    }

    // const sunriseTime = moment.unix(sunrise).format('ha')
    // const sunsetTime = moment.unix(sunset).format('ha')
    // const middleTime = moment.unix((sunrise + sunset / 2)).format('ha')

    return (
        <ResponsiveContainer width='100%' height={150}>
            <AreaChart
                data={newdata}
            >
                <XAxis dataKey="time" tickLine={true} height={50} interval={'preserveStartEnd'} tick={<CustomizedAxisTick />} />
                <YAxis domain={['dataMin', 'auto']} hide={true} />
                <Area type="basis" dataKey="degree" dot={false} stroke="#FBE2AC" fill="url(#splitColor)" fillOpacity={1} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
