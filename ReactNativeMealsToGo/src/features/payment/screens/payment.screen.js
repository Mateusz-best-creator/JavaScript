import React, {useState, useContext, useEffect} from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, Divider, TextInput  } from 'react-native-paper';

import { PaymentContext } from "../../../services/payments/payments.context";
// info card
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
// safe area container
import { SafeArea } from "../../restaurants/screens/restaurants-screen.styles";
// text and spacer helper components
import { Text } from "../../../components/text/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

// restaurant order component
import OrderedRestaurant from "../../../components/orderedRestaurant/ordered-restaurant.component";

const EmptyContainer = styled(View)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

const PaymentIcon = styled(Avatar.Icon).attrs({
    icon: 'cart-off',
    size: 140,
  })`
    background-color: #2182BD;
`

const OrdersContainer = styled.View`
    padding: ${props => props.theme.space[3]};
`

const PaymentButton = styled(Button)`
    width: 70%;
    background-color: #2182BD;
    padding: ${props => props.theme.space[2]};
    margin: 0 auto;
`


const PaymentScreen = () => {

    const {productsToBuy, restaurantSingleData, clearProduct} = useContext(PaymentContext);
    const [payRestaurants, setPayRestaurants] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [succesfullPayment, setSuccesfullPayment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let localPrice = 0;
        const keysArray = Object.keys(productsToBuy);
        const productsArray = keysArray.map((item) => {
            localPrice += Number(productsToBuy[item]);
            return {
                name: item,
                quantity: productsToBuy[item],
            }
        })
        setPayRestaurants(productsArray);
        setTotalPrice(localPrice * 19.99);
    }, [productsToBuy, restaurantSingleData])

    const handleClear = () => {
        clearProduct();
    }

    const handlePayment = () => {
        if (!textInput) {
            setErrorMessage('Pls enter your name.')
            return;
        };
        setErrorMessage('')
        clearProduct();
        setSuccesfullPayment('success');
        setTimeout(() => {
            setSuccesfullPayment('');
            setTextInput('');;
        }, 2500)
    }

    return (
        <>
            {
                succesfullPayment 
                ? (
                    <EmptyContainer>
                        <PaymentIcon />
                        <Spacer size="large" />
                        <Text>Payment Successfull</Text>
                        <Text>Thanks {textInput}.</Text>
                    </EmptyContainer>
                )
                :
                Object.keys(productsToBuy).length === 0
                ? <EmptyContainer>
                    <PaymentIcon />
                    <Spacer size="large" />
                    <Text>Your cart is empty.</Text>
                </EmptyContainer>
                : (
                    <ScrollView>
                        <SafeArea>
                            <RestaurantInfoCard restaurant={restaurantSingleData} />
                            
                                <OrdersContainer>
                                    <Text>Your Orders:</Text>
                                    {
                                        payRestaurants.map((res, index) => {
                                            return (
                                                <>
                                                    <Spacer size="medium" />
                                                    <OrderedRestaurant key={`${index}-${res}`} resturantName={res.name} resturantQuantity={res.quantity} />
                                                </>
                                            )
                                        })
                                    }
                                    <Spacer size="large" />
                                    <Text>Total:</Text>
                                    <Text>${totalPrice}</Text>
                                    <Divider />
                                    <Spacer size="large" />
                                    <TextInput
                                        label="Name"
                                        value={textInput}
                                        onChangeText={setTextInput}
                                    />
                                    <Spacer size="medium" />
                                    {
                                        errorMessage
                                        ? <Text variant='error'>{errorMessage}</Text>
                                        : null
                                    }
                                    <PaymentButton icon="cash" mode="contained" onPress={() => handlePayment()}>
                                        Pay
                                    </PaymentButton>
                                    <Spacer size="medium" />
                                    <PaymentButton onPress={() => handleClear()} style={{backgroundColor: '#FF4347'}} icon="cart-off" mode="contained">
                                        Clear Cart
                                    </PaymentButton>
                                </OrdersContainer>
                        </SafeArea>
                    </ScrollView>
                )
            }
        </>
    )
}
// resturantName={restaurant[0]} resturantQuantity={} 
export default PaymentScreen;