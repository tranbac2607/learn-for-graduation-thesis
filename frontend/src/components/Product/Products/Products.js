import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';

import './Products.css';
import { getProduct, clearErrors } from '../../../actions/productAction';
import Loading from '../../layout/Loading/Loading';
import ProductCard from '../../Home/ProductCard';
import MetaData from '../../layout/MetaData';

const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
];

const Products = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = e => {
        setCurrentPage(e);
    };

    const handleSortByPrice = (event, newPrice) => {
        setPrice(newPrice);
    };

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector(state => state.products);

    const keyword = match.params.keyword;

    let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

    return (
        <>
            {
                loading
                    ? <Loading />
                    : <>
                        <MetaData title='ECOMMERCE -- PRODUCTS' />
                        <h2 className="products__heading">Products</h2>

                        <div className="products">
                            {products && products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>

                        <div className="filter__box">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={handleSortByPrice}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                                min={0}
                                max={25000}
                            />
                            <Typography>Categories</Typography>
                            <ul className="category-box">
                                {categories.map((category, index) => (
                                    <li
                                        className="category-link"
                                        key={index}
                                        onClick={() => {
                                            setCategory(category)
                                        }}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography>Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating)
                                    }}
                                    aria-labelledby='continuous-slider'
                                    min={0}
                                    max={5}
                                    valueLabelDisplay='auto'
                                />
                            </fieldset>
                        </div>


                        {resultPerPage < count &&
                            (<div className="pagnation__box">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    pageRangeDisplayed={5}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page__item"
                                    linkClass="page__link"
                                    activeClass="page__item--active"
                                    activeLinkClass="page__link--active"
                                />
                            </div>)
                        }
                    </>
            }
        </>
    );
};

export default Products;