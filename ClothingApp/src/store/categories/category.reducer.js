import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setCurrentCategories(state, action){
            state.categories = action.payload;
        },
        setCategoriesAreLoading(state, action) {
          state.isLoading = action.payload;
        }
    }
})

export const {setCurrentCategories, setCategoriesAreLoading} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;