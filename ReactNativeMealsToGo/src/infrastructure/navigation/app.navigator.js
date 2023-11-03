import React from "react";

// expo icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

// naviggation stuff
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// restaurants separate navigator
import { RestaurantsNavigator } from "./restaurants.navigator";
// payment navigator
import PaymentNavigator from "./payment.navigator";

// map screen
import MapScreen from "../../features/map/screens/map-screen.screen";
// settings navigator
import SettingsNavigator from "./settings.navigator";
// restaurants context
import { RestaurantProvider } from "../../services/restaurants/restaurants.context";
// location context
import { LocationContextProvider } from "../../services/location/location.context";
// favourites context
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
// Payments Context
import { PaymentContextProvider } from "../../services/payments/payments.context";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    return (
        // navigation was build on documentation https://reactnavigation.org/docs/tab-based-navigation
        <NavigationContainer>
            <FavouritesContextProvider>
                <LocationContextProvider>
                    <RestaurantProvider>
                        <PaymentContextProvider>
                        <Tab.Navigator screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => {
                                
                                const { name } = route;
                                
                                switch(name) {
                                case 'Restaurants':  
                                    focused ? color = 'tomato' : color = 'black';
                                    return <Ionicons name="restaurant-outline" size={24} color={color} />
                                case 'Payment':
                                    return <Ionicons name="cart" size={24} color={color} />
                                case 'Map':
                                    return <Feather name="map" size={24} color={color} />
                                case 'Settings':
                                    return <Feather name="settings" size={24} color={color} />
                                default:
                                    return;
                                }
                            },
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                            headerShown: false,
                            })}
                        >
                                        
                            <Tab.Screen  name="Restaurants" component={RestaurantsNavigator} />
                            <Tab.Screen  name="Payment" component={PaymentNavigator} />
                            <Tab.Screen name="Map" component={MapScreen} />
                            <Tab.Screen name="Settings" component={SettingsNavigator} />
                        </Tab.Navigator>
                        </PaymentContextProvider>
                    </RestaurantProvider>
                </LocationContextProvider>
            </FavouritesContextProvider>
        </NavigationContainer>
    )
}