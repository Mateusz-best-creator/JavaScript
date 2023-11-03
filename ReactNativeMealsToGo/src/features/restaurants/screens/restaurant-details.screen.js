import React, {useState, useContext} from "react";
import styled from "styled-components/native";
import {Button, Divider} from "react-native-paper";
import { Text } from "../../../components/text/text.component";
// restaurant info component
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { ScrollView } from "react-native";

// list accordion
import { List } from "react-native-paper";

import { SafeArea } from "./restaurants-screen.styles";

import { Spacer } from "../../../components/spacer/spacer.component";

// payment context
import { PaymentContext } from "../../../services/payments/payments.context";

export const PayButton = styled(Button)`
    width: 80%;
    margin: 0 auto;
    background-color: #2182BD;
    padding: ${props => props.theme.space[2]};
`

const ListItem = styled(List.Item)`
    background-color: white;
`

export const RestaurantDetailsScreen = ({ route: {params}, navigation }) => {

    const { productsToBuy, addProducts, addRestaurantData } = useContext(PaymentContext);
    const {photoUrl, restaurantData} = params;
    const [expandedBreakfast, setExpandedBreakfast] = useState(false);
    const [expandedLunch, setExpandedLunch] = useState(false);
    const [expandedDinner, setExpandedDinner] = useState(false);
    const [expandedDrinks, setExpandedDrinks] = useState(false);

    const handleButtonClick = () => {
        addProducts(productsToBuy, restaurantData);
        addRestaurantData(restaurantData);
        navigation.navigate("Payment")
    }

    return (
        <SafeArea >
            <RestaurantInfoCard restaurant={restaurantData} photoUrl={photoUrl} />
            <ScrollView>
                {/* this feature was build on react navigation documentation https://callstack.github.io/react-native-paper/4.0/list-accordion.html */}
                <List.Section>
                    <List.Accordion
                        title="Breakfast"
                        left={props => <List.Icon {...props} icon="bread-slice"/>}
                        expanded={expandedBreakfast}
                        onPress={() => setExpandedBreakfast(!expandedBreakfast)}>
                        <ListItem title="Eggs Benedict" />
                        <Divider />
                        <ListItem title="Classic Breakfast" />
                        <Divider />
                    </List.Accordion>
                    <Divider />
                    <List.Accordion
                        title="Lunch"
                        left={props => <List.Icon {...props} icon="hamburger" />}
                        expanded={expandedLunch}
                        onPress={() => setExpandedLunch(!expandedLunch)}>
                        <ListItem title="Burger w/ Fries" />
                        <Divider />
                        <ListItem title="Steak Sandwich" />
                        <Divider />
                        <ListItem title="Mushroom Soup" />
                        <Divider />
                    </List.Accordion>
                    <Divider />
                    <List.Accordion
                        title="Dinner"
                        left={props => <List.Icon {...props} icon="food-variant" />}
                        expanded={expandedDinner}
                        onPress={() => setExpandedDinner(!expandedDinner)}>
                        <ListItem title="Spaghetti Bolognese" />
                        <Divider />
                        <ListItem title="Veal Cutlet with Chicken Mushroom Rotini" />
                        <Divider />
                        <ListItem title="Steak Frites" />
                        <Divider />
                    </List.Accordion>
                    <Divider />
                    <List.Accordion
                        title="Drinks"
                        left={props => <List.Icon {...props} icon="cup" />}
                        expanded={expandedDrinks}
                        onPress={() => setExpandedDrinks(!expandedDrinks)}>
                        <ListItem title="Coffee" />
                        <Divider />
                        <ListItem title="Tea" />
                        <Divider />
                        <ListItem title="Modelo" />
                        <Divider />
                        <ListItem title="Coke" />
                        <Divider />
                        <ListItem title="Fanta" />
                        <Divider />
                    </List.Accordion>
                    <Divider />
                </List.Section>
            </ScrollView>
            <PayButton onPress={() => handleButtonClick()}>
                <Text style={{color: 'white'}}>Order Special Only $19.99</Text>   
            </PayButton>
            <Spacer size='medium' />
        </ SafeArea>
    )
}