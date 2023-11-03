import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Text } from "../text/text.component";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import CompactRestaurantInfo from "../restaurant/contact-restaurant-info.component";
import { Card } from "react-native-paper";

const FavouritesWrapper = styled(Card)`
    padding: 10px;
    z-index: 999;
`

const FavouritesBar = ({ favourites, onNavigate }) => {
    if (!favourites.length) return;
    return (
        <FavouritesWrapper>
            <Text>Favourites</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                {
                    favourites &&
                    favourites.map((restaurant) => {
                        const key = restaurant.name;
                        return (
                            <Spacer key={key} position={"left"} size="medium">
                            <TouchableOpacity onPress={() => {
                                onNavigate("RestaurantDetail", {restaurantData: restaurant, photoUrl: restaurant.photos[0]});
                            }}>
                                <CompactRestaurantInfo restaurant={restaurant} />
                            </TouchableOpacity>
                            </Spacer>
                        )
                    })
                }
            </ScrollView>
        </FavouritesWrapper>
    )
}

export default FavouritesBar;