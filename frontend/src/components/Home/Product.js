import React from 'react';

import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

import './Home.css';

const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    size: window.innerHeight < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
};

const Product = ({ product }) => {
    return (
        <Link className='product__cart' to={product._id}>
            <img className='product__image' src={product.images[0].url} alt={product.name} />
            <h3 className='product__name'>{product.name}</h3>
            <div className='product__vote'>
                <ReactStars {...options} />
                <span className='product__vote-count'>(267 Reviews)</span>
            </div>
            <span className='product__price'>{product.price}</span>
        </Link>
    );
};

export default Product;