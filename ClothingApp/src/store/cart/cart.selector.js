import { createSelector } from "reselect";

const selectCartReducer = (state) => {
    return state.cart;
}

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => {
        return cart.cartItems;
    }
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => {
        return cart.isCartOpen;
    }
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((acc, cartItem) => {
            const {price, quantity} = cartItem;
            return acc + (price * quantity);
        }, 0)
    }
)