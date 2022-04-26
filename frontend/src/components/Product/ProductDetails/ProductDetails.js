import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import './ProductDetails.css';
import { getProductDetails, clearErrors } from '../../../actions/productAction';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../RerviewCard/ReviewCard';
import Loading from '../../layout/Loading/Loading';
import MetaData from '../../layout/MetaData';

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {
        product,
        loading,
        error,
    } = useSelector(state => state.productDetails);

    const options = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.1)',
        activeColor: 'tomato',
        size: window.innerHeight < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(match.params.id))
    }, [alert, dispatch, error, match.params.id])


    return (
        <>
            {
                loading
                    ? <Loading />
                    : <>
                        <MetaData title={`ECOMMERCE -- ${product.name}`} />
                        <div className='product-details'>
                            <div className='product-details__block product-details__block-left'>
                                <Carousel>
                                    {
                                        product.images &&
                                        product.images.map((image, index) => (
                                            <img
                                                key={index}
                                                className='carousel-image'
                                                src={image.url}
                                                alt={`${index} Slide`}
                                            />
                                        ))
                                    }
                                </Carousel>
                            </div>

                            <div className='product-details__block product-details__block-right'>
                                <div className='product-details__block-one'>
                                    <h2 className='product-details__name'>{product.name}</h2>
                                    <p className='product-details__id'>Product # {product._id}</p>
                                </div>
                                <div className='product-details__block-two'>
                                    <ReactStars {...options} />
                                    <span className='product-details__num-of-reviews'>({product.numOfReviews} Reviews)</span>
                                </div>
                                <div className='product-details__block-three'>
                                    <h1 className='product-details__price'>{`$${product.price}`}</h1>
                                    <div className='product-details__block-three__one'>
                                        <div className='product-details__block-three__one-one'>
                                            <button className='product-details__button__add-sub'>-</button>
                                            <input className='product-details__enter' value='1' type='number' />
                                            <button className='product-details__button__add-sub'>+</button>
                                        </div> {' '}
                                        <button className='product-details__add-to-cart'>Add to Cart</button>
                                    </div>
                                    <p className='product-details__status'>
                                        Status: {' '}
                                        <b className={product.Stock < 1 ? 'red-color' : 'green-color'}>
                                            {product.Stock < 1 ? 'OutOfStock' : 'Instock'}
                                        </b>
                                    </p>
                                </div>
                                <div className='product-details__block-four'>
                                    Desciption: <p className='product-details__description'>{product.description}</p>
                                </div>
                                <button className='submit-review'>Submit Review</button>
                            </div>
                        </div>

                        <h3 className="reviews__heading">REVIEWS</h3>

                        {product.reviews && product.reviews[0]
                            ? (
                                <div className="reviews">
                                    {product.reviews.map((review, index) =>
                                        <ReviewCard key={index} review={review} />
                                    )}
                                </div>
                            )
                            : (
                                <p className="no-reviews">No Reviews Yets</p>
                            )
                        }
                    </>
            }
        </>
    );
};

export default ProductDetails;