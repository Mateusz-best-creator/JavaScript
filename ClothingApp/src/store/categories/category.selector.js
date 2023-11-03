import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    return state.categories;
}

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log(categoriesSlice.categoriesData)
        return categoriesSlice.categories;
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((accumulator, category) => {
            const { title, items } = category;
            accumulator[title.toLowerCase()] = items;
            return accumulator;
        }, {})
    }
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)