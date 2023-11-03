import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { Title, CategoryContainer } from './category.styles';

import { useSelector } from 'react-redux';

import { 
    selectCategoriesIsLoading, 
    selectCategoriesMap 
} from '../../store/categories/category.selector';

const Category = () => {

    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)

    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);
   
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading 
                ? <Spinner /> 
                : <CategoryContainer>
                    {/* Only when or products !== undefined we want to use map */}
                    {
                        products &&
                        products.map((product) => {
                            const { id } = product;
                            return <ProductCard key={id} product={product} />
                        })
                    }
                </CategoryContainer>
            }
        </>
    )
}

export default Category;