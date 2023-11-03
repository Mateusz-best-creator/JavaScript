import React, {useContext} from "react";
import { Button } from 'react-native-paper';
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/text/text.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { SafeArea } from "../../restaurants/screens/restaurants-screen.styles";
// restaurant card info component
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

// go back button
export const GoBackButton = styled(Button)`
    width: 50%;
    margin: 0 auto;
    background-color: #2182BD;
    padding: ${props => props.theme.space[2]};
`

const TitleContainer = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FavouritesScreen = ({ navigation }) => {

    const {favourites} = useContext(FavouritesContext);
    return (
        <SafeArea>
        <Spacer size='large' />
        <Spacer size='large' />
            <TitleContainer>
                <Text style={{fontSize: 16}} variant='caption'>Your Favourites Restaurants:</Text>
            </TitleContainer>
            <Spacer size='large' />
            {
                !favourites.length
                ? (
                    <TitleContainer>
                        <Spacer size='large' />
                        <Text style={{fontSize: 16}} variant='caption'>Your Card is empty</Text>
                    </TitleContainer>
                ) : null
            }
            <FlatList
                data={favourites}
                renderItem={({item, index}) => {
                    if (index === favourites.length - 1) {}
                    return (
                        <>
                        <TouchableOpacity onPress={() => navigation.navigate("RestaurantDetail", {restaurantData: item})}>
                            <RestaurantInfoCard restaurant={item} />
                        </TouchableOpacity>
                        {
                            index === favourites.length - 1
                            ? (
                                <>
                                    <Spacer size='large' />
                                    <GoBackButton onPress={() => navigation.navigate('Settings')}>
                                        <Text style={{color: 'white'}}>Go Back To Settings</Text>   
                                    </GoBackButton>
                                    <Spacer size='large' />
                                </>
                            ) : null
                        }
                        </>
                    )
                }}
                keyExtractor={item => item.name}
        />
        </SafeArea>
    )
}

export default FavouritesScreen;