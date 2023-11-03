import React from "react";

import { 
    CheckoutContainer,
    ImageContainer,
    RemoveButton,
    NamePrice,
    Quantity,
    Arrow,
    Value,
} from  './checkout-item.styles.jsx';

// redux dispatch
import { useDispatch } from "react-redux";
// cart redux actions
import { 
    addItemToCart,
    removeItemToCart,
    clearItemFromList,
} from "../../store/cart/cart.reducer.js";

const CheckoutItem = ({ cartItem }) => {

    const { imageUrl, name, price, quantity } = cartItem;

    const dispatch = useDispatch();

    const clearItemFromListHandler = () => dispatch(clearItemFromList(cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItem));
    const removeItemHandler = () => dispatch(removeItemToCart(cartItem));

    return (
        <CheckoutContainer>
           <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
           </ImageContainer>
           <NamePrice> {name} </NamePrice>
           <Quantity>
                <Arrow onClick={() => removeItemHandler()}>
                    &#10094;
                </Arrow> 
                <Value>{quantity}</Value>
                <Arrow onClick={() => addItemHandler()}>
                    &#10095;
                </Arrow> 
           </Quantity>
           <NamePrice> {price} </NamePrice>
           <RemoveButton onClick={() => clearItemFromListHandler()}>
                &#10005;
           </RemoveButton>
        </CheckoutContainer>
    )
}

export default CheckoutItem;