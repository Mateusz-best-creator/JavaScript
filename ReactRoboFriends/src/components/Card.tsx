import React from 'react';
import './Card.css';

import { Robots } from '../App';

type CardType = {
    robot: Robots;
}

const Card = ({robot}: CardType) => {
    const {name, email, id} = robot;
    return (
        <div key={name} className='tc dib element pa2 ma3'>
            <img src={`https://robohash.org/${id}`} alt="robot" />
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    )
}

export default Card;