import React, {useContext} from "react";
import styled from "styled-components/native";
import {AntDesign} from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

import {FavouritesContext} from '../../services/favourites/favourites.context';

const FavouriteButton = styled(TouchableOpacity)`
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 10;
`

const FavouriteIcon = ({ restaurant }) => {

    const {favourites, addToFavourites, removeFromFavourites} = useContext(FavouritesContext);
    
    const isFavourite = favourites.find((res) => {
        return res.placeId === restaurant.placeId;
    })

    const handlePress = () => {
        if (!isFavourite) {
            addToFavourites(restaurant);
        } else {
            removeFromFavourites(restaurant); 
        }
    }
    
    return (
        <FavouriteButton onPress={handlePress}>
            <AntDesign 
                name={
                    isFavourite ? "heart" : "hearto"
                }
                size={24}
                color={
                    isFavourite ? "red" : "white"
                }
            />
        </FavouriteButton>
    )
}

export default FavouriteIcon;
