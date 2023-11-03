import React, { useState, useEffect, createContext } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext({
    keyword: null,
    setKeyword: () => null,
    location: "san francisco",
    setLocation: () => null,
    isLoading: false,
    setIsLoading: () => null,
    error: null,
    setError: () => null,
})

export const LocationContextProvider = ({ children }) => {

    const [keyword, setKeyword] = useState("San Francisco")
    const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearchFunction = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword.toLowerCase());
    }

    useEffect(() => {
        if (!keyword.length) {
            // don't do anything
            return;
        }
        locationRequest(keyword.toLowerCase())
            .then(locationTransform)
            .then(result => {
                setIsLoading(false);
                setLocation(result);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            })
    }, [keyword]);

    value = { keyword, location, isLoading, error, onSearchFunction }

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}