import React from 'react';
import './Days.css';

import DayCard from './DayCard'

function Days(props) {
    const { data = [] } = props

    return (
        <div className="days">
            {
                data.map(dayData =>
                    <DayCard key={dayData.dt} data={dayData} />
                )
            }
        </div>
    );
}

export default Days;