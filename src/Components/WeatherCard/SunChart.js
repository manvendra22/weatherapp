import React, { useEffect, useContext } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import suncalc from 'suncalc'
import {
    AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine
} from 'recharts';

import ThemeContext from '../../utility/ThemeContext';

import sun from '../../icons/sun_dot.svg'
import moon from '../../icons/moon.svg'

const moment = extendMoment(Moment);

function CustomizedAxisTick(props) {
    const {
        x, y, index, payload
    } = props;

    let anchor = ['start', 'middle', 'end']

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={10} textAnchor={anchor[index]} fill='var(--color-text-secondary)' fontSize={12} fontWeight={500} >{payload.value}</text>
        </g>
    );
}

function CustomizedDot(props) {
    const {
        cx, cy, payload, dayOrNight
    } = props;

    const currentTime = moment().format('ha')

    return (
        payload.hourLabel === currentTime && <image x={cx - 20} y={cy - 20} width={30} height={30} xlinkHref={dayOrNight === 'DAY' ? sun : moon} alt="dotIcon" />
    );
}

function setThemeBasedOnTime(toggleTheme, currentMode, dayOrNight) {
    if ((currentMode === 'DARK' && dayOrNight === 'DAY') || (currentMode === 'LIGHT' && dayOrNight === 'NIGHT')) {
        toggleTheme()
    }
}

export default function SunChart(props) {
    const { data } = props
    const { daily = [], lat, lon } = data
    const { sunrise, sunset } = daily[0]
    const { sunrise: sunriseNextDay } = daily[1]

    const sunriseTime = moment.unix(sunrise)
    const sunsetTime = moment.unix(sunset)

    let dayOrNight = ''
    let startLabel = ''
    let endLabel = ''
    let chartData = []

    const { toggleTheme, currentMode } = useContext(ThemeContext);

    if (moment().isBetween(sunriseTime, sunsetTime)) {
        dayOrNight = 'DAY'
        startLabel = 'Sunrise'
        endLabel = 'Sunset'

        const sunriseTime = moment.unix(sunrise)
        const sunsetTime = moment.unix(sunset)

        const sunRange = moment.range(sunriseTime.subtract(2, 'h'), sunsetTime.add(2, 'h'));
        const sunRangeHours = Array.from(sunRange.by('hour'));

        chartData = sunRangeHours.map(hour => {
            let sunPosition = suncalc.getPosition(hour, lat, lon)
            return {
                hour,
                hourLabel: moment(hour).format("ha"),
                altitude: sunPosition.altitude,
            }
        })
    } else {
        dayOrNight = 'NIGHT'
        startLabel = 'Sunset'
        endLabel = 'Sunrise'

        const sunsetTime = moment.unix(sunset)
        const sunriseNextDayTime = moment.unix(sunriseNextDay)

        const moonRange = moment.range(sunsetTime.subtract(2, 'h'), sunriseNextDayTime.add(2, 'h'));
        const moonRangeHours = Array.from(moonRange.by('hour'));

        chartData = moonRangeHours.map(hour => {
            let moonPosition = suncalc.getMoonPosition(hour, lat, lon)
            return {
                hour,
                hourLabel: moment(hour).format("ha"),
                altitude: moonPosition.altitude,
            }
        })
    }

    useEffect(function () {
        setThemeBasedOnTime(toggleTheme, currentMode, dayOrNight)
        // eslint-disable-next-line 
    }, [])

    let length = chartData.length
    let mid = Math.round(length / 2)

    const ticksData = [chartData[0].hourLabel, chartData[mid].hourLabel, chartData[length - 1].hourLabel]

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

    const startLabelTime = moment.unix(dayOrNight === 'DAY' ? sunrise : sunset).format('h:mma')
    const endLabelTime = moment.unix(dayOrNight === 'DAY' ? sunset : sunset).format('h:mma')

    return (
        <>
            <div className="chartTitle">
                Sun Position
            </div>
            <div className="areaChartRow">
                <div>
                    <div className="boldText mb-2">{startLabel}</div>
                    <div className="secondaryTextColor">{startLabelTime}</div>
                </div>
                <div>
                    <div className="boldText mb-2">{endLabel}</div>
                    <div className="secondaryTextColor">{endLabelTime}</div>
                </div>
            </div>
            <ResponsiveContainer width='100%' height={160}>
                <AreaChart
                    data={
                        chartData
                    }
                    margin={{ top: 20, left: 20, right: 20, bottom: 5 }}
                >
                    <XAxis dataKey="hourLabel" height={50} ticks={ticksData} tick={<CustomizedAxisTick />} tickSize={20} axisLine={false} />
                    <YAxis hide={true} />
                    <ReferenceLine purpose='fake x axis' y={0} stroke='var(--color-text-secondary)' />
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#c9ebff" stopOpacity={1} />
                            <stop offset={off} stopColor="#7475b6" stopOpacity={0.5} />
                        </linearGradient>
                    </defs>
                    <Area type="basis" dataKey="altitude" stroke="false" fill="url(#splitColor)" dot={<CustomizedDot dayOrNight={dayOrNight} isAnimationActive={false} />} />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}
