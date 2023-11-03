import './product-card.styles.scss';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component.jsx';

import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.reducer';

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;

    const addProductToCart = () => {
        return dispatch(addItemToCart(product));
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button 
                buttonType={BUTTON_TYPES_CLASSES.inverted} 
                onClick={addProductToCart} >Add</Button>
        </div>
    )
}

export default ProductCard;