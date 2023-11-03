import React, {createContext, useState} from "react";

const addProductsHandler = (currentProducts, newProduct) => {

    const { name } = newProduct;

    if (!currentProducts.hasOwnProperty(name)) {
        currentProducts[name] = 0
    }
    currentProducts[name] += 1;
    
    return {...currentProducts}
}

const removeProductsHandler = (currentProducts, productName) => {
    delete currentProducts[productName];
    return {...currentProducts};
}

export const PaymentContext = createContext({
    producutsToBuy: {},
    setProductsToBuy: () => null,
});

export const PaymentContextProvider = ({ children }) => {

    const [productsToBuy, setProductsToBuy] = useState({});
    const [restaurantSingleData, setRestaurantSingleData] = useState({})

    const addProducts = (currentProducts, newProduct) => {
        const modifiedProducts = addProductsHandler(currentProducts, newProduct);
        setProductsToBuy(modifiedProducts);
    }

    const addRestaurantData = (res) => {
        setRestaurantSingleData(res);
    }

    const removeProduct = (currentProducts, productName) => {
        const modifiedProducts = removeProductsHandler(currentProducts, productName);
        setProductsToBuy(modifiedProducts);
    }

    const clearProduct = () => {
        setProductsToBuy({})
    }

    const value = {addProducts, productsToBuy, restaurantSingleData, addRestaurantData, removeProduct, clearProduct};

    return <PaymentContext.Provider value={value}>{ children }</PaymentContext.Provider>
}