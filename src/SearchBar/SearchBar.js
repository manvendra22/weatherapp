import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const { value, setValue, cityData } = props

    return (
        <div className="search">
            <input type="text" className="searchbar" value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
}

export default SearchBar;
