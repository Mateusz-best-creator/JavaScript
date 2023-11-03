import React, {useContext} from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Text } from "../text/text.component";
import { Avatar } from 'react-native-paper';
import { PaymentContext } from "../../services/payments/payments.context";

const OrderContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const OrderedRestaurant = ({ resturantName = 'unkonw', resturantQuantity = 1 }) => {

    const {removeProduct, productsToBuy} = useContext(PaymentContext)

    const handleIconClick = () => {
        removeProduct(productsToBuy, resturantName);
    }

    return (
        <OrderContainer>
            <View>
                <Text>special - 12.99 x {resturantQuantity}</Text>
            </View>
            <View>
                <Text>{resturantName}</Text>
            </View>
            <TouchableOpacity onPress={() => handleIconClick()} >
                <Avatar.Icon size={24} icon="alpha-x-circle-outline" />
            </TouchableOpacity>
        </OrderContainer>
    )
}

export default OrderedRestaurant;