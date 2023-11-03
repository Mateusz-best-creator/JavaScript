import React, {createContext, useState, useEffect, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext({
    favourites: [],
    setFavourites: () => null,
})

export const FavouritesContextProvider = ({ children }) => {
    const {appUser} = useContext(AuthenticationContext);
    const [ favourites, setFavourites ] = useState([]);

    // adding restaurant ro favourites function
    const add = (restaurant) => {
        setFavourites([...favourites, restaurant])
    }
    // removing restaurant ro favourites function
    const remove = (restaurant) => {
        const { placeId } = restaurant;
        const filteredFavourites = favourites.filter((res) => {
            return res.placeId !== placeId;
        })
        if (!filteredFavourites) return;
        setFavourites(filteredFavourites);
    }
    // saving and loading data for each user using AsyncStorage was build based on documentaion https://react-native-async-storage.github.io/async-storage/docs/install/
    const saveFavourites = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(`@favourite_restaurants-${appUser.uid}`, jsonValue)
        } catch (e) {
          console.log("ERROR storing ", e);
        }
    }
    const loadFavourites = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(`@favourite_restaurants-${appUser.uid}`)
          const data =  jsonValue !== null ? JSON.parse(jsonValue) : null;
          if(!data) return;
          setFavourites(data);
        } catch(error) {
            console.log("ERROR loading ", error);
        }
    }

    useEffect(() => {
        loadFavourites();
    }, [appUser])

    useEffect(() => {
        saveFavourites(favourites);
    }, [favourites, appUser])

    const value = {favourites, addToFavourites: add, removeFromFavourites: remove};

    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}