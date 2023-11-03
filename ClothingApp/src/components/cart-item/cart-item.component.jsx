import { 
    CartContainer,
    DetailsContainer,
    Name,
 } from './cart-item.styles.jsx';

const CartItem = ({cartItem}) => {

    const { name, quantity, imageUrl, price } = cartItem

    return (
        <CartContainer>
            <img style={{width: '30%'}} src={imageUrl} alt={`${name}`} />
            <DetailsContainer>
                <Name>{name}</Name>
                <Name>{quantity} x ${price}</Name>
            </DetailsContainer>
        </CartContainer>
    )
}

export default CartItem;