import React from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";

import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesIsLoading } from "../../store/categories/category.selector";

const CategoriesPreview = () => {

    const isLoading = useSelector(selectCategoriesIsLoading);
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <>
        {
            isLoading 
            ? <Spinner />
            : Object.keys((categoriesMap)).map((title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })
        }
        </>
    )
}

export default CategoriesPreview;