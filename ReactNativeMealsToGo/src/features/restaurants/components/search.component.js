import React, {useContext, useState, useEffect} from "react";

import { LocationContext } from "../../../services/location/location.context";

import {
    SearchBarContainer,
    SearchingBar,
} from '../screens/restaurants-screen.styles';

const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {

    const { keyword, onSearchFunction } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword])

    return (
        // search bar was build based on docs https://callstack.github.io/react-native-paper/docs/components/Searchbar/
        <SearchBarContainer>
            <SearchingBar
                icon={isFavouritesToggled ? "heart" : "heart-outline"}
                onIconPress={onFavouritesToggle}
                elevation={4}
                placeholder="Search for a location"
                value={searchKeyword}
                onSubmitEditing={() => {
                    const wordWithoutSpaces = searchKeyword.trim()
                    onSearchFunction(wordWithoutSpaces);
                }}
                onChangeText={(text) => {
                    setSearchKeyword(text);   
                }}
            />
        </SearchBarContainer>
    )
}

export default Search;