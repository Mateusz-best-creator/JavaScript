import React from 'react';

import { 
    ShoppingIconContainer,  
    ShoppingIcon,
    Counter,
} from './cart-icon.styles.jsx';

// redux dispatch
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.reducer';

const CartIcon = () => {

    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => {
        return dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <ShoppingIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <Counter>{cartCount}</Counter>
        </ShoppingIconContainer>
    )
}

export default CartIcon;