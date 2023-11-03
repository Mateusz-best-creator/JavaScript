import React, {useContext, useEffect, useState} from 'react';
import { Marker, Callout } from 'react-native-maps';

import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';

import { Map } from './map-screen.styles';
// search bar for map
import {Search} from '../components/map-search.component';

// map callout component
import MapCallout from '../components/map-callout.component';
// everytime we work with react-native-navigation we have access to navigation property(and others)
const MapScreen = ({ navigation }) => {

  const {location} = useContext(LocationContext);
  const {restaurantsData} = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0)

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const latDelta = northeastLat - southwestLat;
    setLatDelta(latDelta);
  }, [location, viewport])
  
  return (
    // all these map features was build based on documentation https://github.com/react-native-maps/react-native-maps
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.03,
        }}
      >
        {
          restaurantsData.map((restaurant) => {
            return (
              <Marker
                key={restaurant.name}
                coordinate={{
                  latitude: restaurant.geometry.location.lat,
                  longitude: restaurant.geometry.location.lng,
                }}
              >
                <Callout onPress={() => navigation.navigate('RestaurantDetail', {restaurantData: restaurant, photoUrl: restaurant.photos[0]})}>
                  <MapCallout restaurant={restaurant} />
                </Callout>
              </Marker> 
            )
          })
        }
      </Map>
    </>
  );
}

export default MapScreen;