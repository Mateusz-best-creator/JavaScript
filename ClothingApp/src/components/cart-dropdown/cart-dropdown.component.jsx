import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { 
    DropdownContainer,
    CartItemsContainer,
    EmptyMessage,
} from './cart-dropdown.styles.jsx';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <DropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length 
                    ? cartItems.map((item) => {
                            return (
                                <CartItem key={item.id} cartItem={item} />
                            )
                        })
                    :  <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </DropdownContainer>
    )
}

export default CartDropdown