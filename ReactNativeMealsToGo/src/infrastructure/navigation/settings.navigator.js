import React from "react";
import { 
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
// settings screen
import SettingsScreen from "../../features/settings/screen/settings.screen";
// favourites screen
import FavouritesScreen from "../../features/settings/screen/favourites.screen";
// camera screen
import CameraScreen from "../../features/settings/screen/camera.screen";

const Stack = createStackNavigator();

const SettingsNavigator = () => {

  return (
    // documentation how to build stack navigation https://reactnavigation.org/docs/tab-based-navigation
    <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;