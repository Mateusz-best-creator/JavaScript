import React from "react";

import { Platform } from "react-native";

import { 
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

// restaurants screen
import RestaurantsScreen from '../../features/restaurants/screens/restaurants.screen';
// restaurants details screen
import { RestaurantDetailsScreen } from "../../features/restaurants/screens/restaurant-details.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {

    const transitionProperty = Platform.OS === 'android' ? 'FadeFromBottomAndroid'  : 'ModalPresentationIOS';

    return (
        <RestaurantStack.Navigator screenOptions={{
            // this property allows us to make pup up our screen from the bottom
            ...TransitionPresets.transitionProperty,
            headerShown: false,
        }}>
            <RestaurantStack.Screen 
                name="Restaurants"  
                // everu component that is inside RestaurantStack.Navigator have access to navigation property and others...(DOCS)
                component={RestaurantsScreen} 
            />
            <RestaurantStack.Screen 
                name="RestaurantDetail" 
                component={RestaurantDetailsScreen} 
            />
        </RestaurantStack.Navigator>
    )
}