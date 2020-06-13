import React from 'react';
import moment from 'moment';
import suncalc from 'suncalc'
import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine
} from 'recharts';

import sun from '../icons/sun_dot.svg'
// import moon from '../icons/moon.svg'

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

function CustomizedDot(props) {
    const {
        cx, cy, payload
    } = props;

    const currentTime = moment().format('ha')

    return (
        payload.time === currentTime && <image x={cx - 20} y={cy - 20} width={30} height={30} xlinkHref={sun} alt="dotIcon" />
    );
}

export default function MainChart(props) {
    const { lat, lon, sunrise, sunset } = props

    const sunriseTime = moment.unix(sunrise).format('HH')
    const sunsetTime = moment.unix(sunset).format('HH')

    let chartData = []
    for(let i = (Number(sunriseTime)-2); i <= (Number(sunsetTime)+2); i++) {
        let timeDate = moment(i, ["HH"])
        let time = moment(timeDate).format("ha")
        let position = suncalc.getPosition(timeDate, lat, lon)

        chartData.push({
            time,
            altitude: position.altitude,
        })
    }

    // let dayOrNight = ''
    // if (moment().isBetween(moment.unix(sunrise), moment.unix(sunset))) {
    //     dayOrNight = 'DAY'
    // } else {
    //     dayOrNight = 'NIGHT'
    // }

    let length = chartData.length
    let mid = Math.round(length / 2)

    const ticksData = [chartData[0].time, chartData[mid].time, chartData[length - 1].time]

    return (
        <ResponsiveContainer width='100%' height={160}>
            <AreaChart
                data={
                    chartData
                }
                margin={{ top: 15, left: 20, right: 20, bottom: 10 }}
            >
                <XAxis dataKey="time" height={50} ticks={ticksData} tick={<CustomizedAxisTick />} tickSize={20} axisLine={false} />
                <YAxis hide={true} />
                <ReferenceLine purpose='fake x axis' y={0} stroke='#666667' />
                <Area type="basis" dataKey="altitude" stroke="#FBE2AC" fill="#FBE2AC" fillOpacity={0.8} dot={<CustomizedDot />} isAnimationActive={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
