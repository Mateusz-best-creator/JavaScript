import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Platform } from "react-native";
import { Text } from "../text/text.component";
import WebView from "react-native-webview";

const CompactImage = styled.Image`
    border-radius: 10px;
    width: 100%;
    height: 100%;
`

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
    padding: 10px;
    max-width: 120px;
    align-items: center;
`
const isAndroid = Platform.OS === 'android';

const CompactRestaurantInfo = ({ restaurant, isMap }) => {
    // if we work with map callout we have to specify our image to avoid errors
    // if we have errors(more likely on android) while trying displaying an image in map component we should use CompactWebView
    const ImageContainer = (isAndroid && isMap) ? CompactWebview : CompactImage;
    return (
        <>
            <Item>
                <ImageContainer style={{height: 85, width: 85,}} source={{
                    uri: restaurant.photos[0],
                }} />
                <Text center variant='caption'>
                    {restaurant.name}
                </Text>
            </Item>
        </>
    )   
}

export default CompactRestaurantInfo;