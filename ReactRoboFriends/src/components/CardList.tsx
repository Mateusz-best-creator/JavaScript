import React from "react";
import Card from './Card';
import './CardList.css'

import { Robots } from "../App";

type CardListType = {
    arrayOfRobots: Robots[];
}

const CardList = ({arrayOfRobots}: CardListType) => {
    const robotsArray = arrayOfRobots.map((robot) => {
        const { id } = robot;
        return <Card key={id} robot={robot} />
    })
    return (
        <div className="tc main-element">
            {robotsArray}
        </div>
    )
}

export default CardList;