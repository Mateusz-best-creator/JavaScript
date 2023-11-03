import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { useDispatch } from 'react-redux';
import { setCategoriesAreLoading, setCurrentCategories } from '../../store/categories/category.reducer';

// firebase get data
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getShopData = async () => {
            dispatch(setCategoriesAreLoading(true));
            const categoriesData = await getCategoriesAndDocuments();
            dispatch(setCurrentCategories(categoriesData));
            dispatch(setCategoriesAreLoading(false));
        }
        getShopData();
      }, [dispatch])

    return (
        <Routes>
            <Route index={true} element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}

export default Shop;