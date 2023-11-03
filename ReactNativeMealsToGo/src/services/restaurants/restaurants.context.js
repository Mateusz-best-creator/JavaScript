import React, { createContext, useState, useEffect, useContext } from "react";

import { LocationContext } from "../location/location.context";

import { restaurantsRequest, restaurantTransform } from "./restaurant.service";

export const RestaurantsContext = createContext({
    restaurantsData: [],
    setRestaurantsData: () => '123123',
})

export const RestaurantProvider = ({children}) => {

    const [restaurantsData, setRestaurantsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location} = useContext(LocationContext);

    const retrieveRestaurants = (loc) => {
        setIsLoading(true);
        setRestaurantsData([]);
        setTimeout(() => {
            restaurantsRequest(loc)
                .then(data => restaurantTransform(data))
                .then(result => {
                    setIsLoading(false);
                    setRestaurantsData(result);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(error);
                });
        }, 2000)
    }

    useEffect(() => {
        const {lat, lng} = location;
        const appropriateLocation = `${lat},${lng}`
        retrieveRestaurants(appropriateLocation);
    }, [location])


    value = {restaurantsData, isLoading, error};

    return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>
}