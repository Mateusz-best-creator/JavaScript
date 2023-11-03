import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// Authentication screens
import AccountScreen from "../../features/account/screens/account.screen";
import LoginScreen from "../../features/account/screens/login.screen";
import RegisterScreen from "../../features/account/screens/register.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Main" component={AccountScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}