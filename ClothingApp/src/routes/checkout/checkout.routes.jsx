import React from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
// Payment form
import PaymentForm from "../../components/payment-form/payment-form.component";

// redux selector hook
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

// styled components
import {
    CheckoutContainer,
    Header,
    HeaderBlock,
    LastHeader,
    TotalSum,
} from './checkout.styles';

const Checkout = () => {

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectCartTotal)
   
    return (
        <CheckoutContainer>

            <Header>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <LastHeader>
                    <span>Remove</span>
                </LastHeader>
            </Header>

            {cartItems.map((cartItem) => {
                const { id } = cartItem;
                return <CheckoutItem key={id} cartItem={cartItem} />
            })}
            <TotalSum>Total: ${totalPrice}</TotalSum>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default Checkout;