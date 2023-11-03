import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

import { 
    PreviewContainer,
    Title,
    PreviewFourItems,
 } from  './category-preview.styles.jsx';

const CategoryPreview = ({ title, products }) => {

    const urlToGo = title.toLowerCase();

    return (
        <PreviewContainer>
            <h2>
                <Link to={urlToGo} >
                    <Title>{title.toUpperCase()}</Title>
                </Link>
            </h2>
            <PreviewFourItems>
                {
                    products.filter((_, idx) => {
                        return idx < 5;
                    }).map((product) => {
                        const { id } = product;
                        return <ProductCard key={id} product={product} />
                    })
                }
            </PreviewFourItems>
        </PreviewContainer>
    )
}

export default CategoryPreview;