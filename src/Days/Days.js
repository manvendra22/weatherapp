import React from 'react';
import './Days.css';

import DayCard from './DayCard'
import Loader from './Loader'

function Days(props) {
    const { data = [], selected, setSelected, isLoading } = props

    return (
        <div className="days">
            {
                isLoading ?
                    <Loader /> :
                    data.map((dayData, index) =>
                        <DayCard key={dayData.dt} data={dayData} active={index === selected} onClick={() => setSelected(index)} />
                    )

            }
        </div>
    );
}

export default Days;