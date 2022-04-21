import React from 'react';
import { CgMouse } from 'react-icons/all';

import './Home.css';
import Product from './Product';

import MetaData from '../../components/layout/MetaData';

const product = {
    name: 'Blue Tshirt',
    images: [{ url: 'https://mabustudio.com/?attachment_id=3204' }],
    price: '$30',
    _id: 'tranbac',
}

const Home = () => {
    return (
        <>
            <MetaData title='Ecommerce' />
            <div className='home__banner'>
                <h2 className='home__title-up'>Wellcome to Ecommerce</h2>
                <h1 className='home__title-down'>Find amazing products below</h1>

                <a href="#container">
                    <button>
                        Scroll
                        <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="home__heading">Featured Products</h2>

            <div id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </>
    );
};

export default Home;