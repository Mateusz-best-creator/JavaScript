import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component";

// favourite icon component
import FavouriteIcon from "../../../components/favourites/favourite-icon.component";

// text helper component
import { Text } from "../../../components/text/text.component";

import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Rating,
  Section,
  SectionEnd,
  Icon,
} from './restaurant-info.card.styled';

export const RestaurantInfoCard = ({ restaurant = {}, photoUrl = ''}) => {
  
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    vicinity = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isTemporarilyClosed = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.round(rating)));
  if (photoUrl) {
    photos[0] = photoUrl;
  }

  return (
    <RestaurantCard>
      <FavouriteIcon restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
                <Icon key={`star-${placeId}-${index}`} source={require('../../../../assets/star2.jpg')} />
            ))}
          </Rating>
          <SectionEnd>
            {isTemporarilyClosed && (
              <Text variant="error">
                CLOSED TEMPORARILY
              </Text>
            )}
            {
              !isTemporarilyClosed && (
                <Spacer position="left" size="large">
                  {<Icon source={require('../../../../assets/open.png')} />}
                </ Spacer>
              )
            }
            <Spacer position="left" size="large">
            <Icon
              source={{
                uri: icon,
              }}
            />
            </ Spacer>
          </SectionEnd>
        </Section>
        <Text variant="caption">{vicinity}</Text>
      </Info>
    </RestaurantCard>
  );
};
