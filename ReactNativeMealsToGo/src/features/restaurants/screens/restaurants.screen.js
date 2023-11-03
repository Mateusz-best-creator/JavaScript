import React, {useContext, useState} from "react";
import { FlatList, TouchableOpacity } from "react-native";

// components
import {RestaurantInfoCard} from "../components/restaurant-info-card.component";

// restaurant context
import {RestaurantsContext} from '../../../services/restaurants/restaurants.context';
// favourites context
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import FavouritesBar from "../../../components/favourites/favourites-bar.component";

import {
    SafeArea,
    LoaderContainer
} from './restaurants-screen.styles';

// loader
import Loader from "../../../components/activityIndicator/activity-indicator.component";
// search component
import Search from "../components/search.component";

// fade animation
import FadeInView from "../../../components/animations/fade.animations";

const RestaurantsScreen = ({ navigation }) => {

    const { restaurantsData, isLoading } = useContext(RestaurantsContext);
    const { favourites } = useContext(FavouritesContext);
    const [isToggled, setIsToggled] = useState(false);
    
    return (
        <SafeArea>
            <Search 
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => setIsToggled(!isToggled)}    
            />
            {
                isToggled && <FavouritesBar onNavigate={navigation.navigate} favourites={favourites} />
            }
            {
                !isLoading
                ? (
                        <FlatList 
                            data={restaurantsData}
                            renderItem={({item}) => {
                                return (
                                    // .navigate is a prop from navigation
                                    <TouchableOpacity  onPress={() => navigation.navigate("RestaurantDetail", {restaurantData: item, photoUrl: item.photos[0]})}>
                                        <FadeInView>
                                            <RestaurantInfoCard restaurant={item} />
                                        </FadeInView>
                                    </TouchableOpacity >   
                                )
                            }}
                            keyExtractor={item => item.name}
                            // these styled will apply to the holistic content inside the container.  / holistic => całościowy
                            contentContainerStyle={{padding: 8}}
                        />
                )
                : <LoaderContainer>
                    <Loader />
                </LoaderContainer>
                
            }
        </SafeArea>
    )
}

export default RestaurantsScreen;