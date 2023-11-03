import React, {ChangeEvent} from 'react';
import './SearchBox.css';

type SearchBoxType = {
    onChangeFunction: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({onChangeFunction}: SearchBoxType) => {
    return (
        <div className='tc content-element'>
            <h1>RoboFriends</h1>
            <input type="search" onChange={onChangeFunction}/>
        </div>
    )
}

export default SearchBox