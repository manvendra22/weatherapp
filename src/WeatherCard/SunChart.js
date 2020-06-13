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

export default function SunChart(props) {
    const { lat, lon, sunrise, sunset } = props

    const Totalhours = [...Array(24).keys()]

    const ChartData = Totalhours.map(hour => {
        let dateTime = moment(hour, ["HH"])
        let labelTime = moment(dateTime).format("ha")

        let sunPosition = suncalc.getPosition(dateTime, lat, lon)
        let moonPosition = suncalc.getMoonPosition(dateTime, lat, lon)

        return {
            dateTime,
            labelTime,
            sunPosition: sunPosition.altitude,
            moonPosition: moonPosition.altitude
        }
    })

    const sunriseTime = moment.unix(sunrise).format('HH')
    const sunsetTime = moment.unix(sunset).format('HH')

    let dayOrNight = 'DAY'
    let startValue = Number(sunriseTime) - 2
    let endValue = Number(sunsetTime) + 2

    if (!moment().isBetween(moment.unix(sunrise), moment.unix(sunset))) {
        dayOrNight = 'NIGHT'
        startValue = Number(sunsetTime) - 2
        endValue = Number(sunriseTime) + 2
    }

    let mainChartData = ChartData.filter(data => moment().isBetween(moment.unix(startValue), moment.unix(endValue)))

    console.log({ ChartData })

    let begin = Number(sunriseTime) - 2
    let end = Number(sunsetTime) + 2

    let chartData = []
    for (let i = begin; i <= end; i++) {
        let timeDate = moment(i, ["HH"])
        let time = moment(timeDate).format("ha")
        let position = suncalc.getPosition(timeDate, lat, lon)

        chartData.push({
            time,
            altitude: position.altitude,
        })
    }

    let length = chartData.length
    let mid = Math.round(length / 2)

    const ticksData = [chartData[0].time, chartData[mid].time, chartData[length - 1].time]

    const gradientOffset = () => {
        const dataMax = Math.max(...chartData.map((i) => i.altitude));
        const dataMin = Math.min(...chartData.map((i) => i.altitude));

        if (dataMax <= 0) {
            return 0
        }
        else if (dataMin >= 0) {
            return 1
        }
        else {
            return dataMax / (dataMax - dataMin);
        }
    }

    const off = gradientOffset();

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
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="#FBE2AC" stopOpacity={0.8} />
                        <stop offset={off} stopColor="#666667" stopOpacity={0.8} />
                    </linearGradient>
                </defs>
                <Area type="basis" dataKey="altitude" stroke="false" fill="url(#splitColor)" dot={<CustomizedDot />} isAnimationActive={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
