import React from 'react';
import './Days.css';

import DayCard from './DayCard'
import Loader from './Loader'

function Days(props) {
    const { data = [], selected, setSelected } = props

    return (
        <div className="days">
            {
                data.length === 0 ?
                    <Loader /> :
                    data.map((dayData, index) =>
                        <DayCard key={dayData.dt} data={dayData} active={index === selected} onClick={() => setSelected(index)} />
                    )

            }
        </div>
    );
}

export default Days;