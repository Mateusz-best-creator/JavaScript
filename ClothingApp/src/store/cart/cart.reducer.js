import { createSlice } from "@reduxjs/toolkit";

// helper functions to allow certain operations on cart elements
const addCartItem = (cartItems, productToAdd) => {
    
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((item) => {
        return item.id === productToAdd.id;
    })
  
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return (
                cartItem.id === productToAdd.id 
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
        })
    }
    
    // Otherwise return new array with modified cartItems
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((item) => {
        return item.id === cartItemToRemove.id;
    })

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id);
    }

    return cartItems.map((item) => {
        return (
            item.id === cartItemToRemove.id 
            ? {...item, quantity: item.quantity - 1}
            : item
        )
    })
}

const clearItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
}

export const INITIAL_STATE = {
    cartItems : [],
    isCartOpen: false,
}

const cartSlice = createSlice({
    name: 'checkoutCart',
    initialState: INITIAL_STATE,
    reducers: {
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemToCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromList(state, action) {
            state.cartItems = clearItem(state.cartItems, action.payload);
        },
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        }
    }
})

export const {addItemToCart, removeItemToCart, clearItemFromList, setIsCartOpen} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;