import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/all';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

import './Home.css';
import ProductCard from './ProductCard';
import MetaData from '../../components/layout/MetaData';
import { getProduct } from '../../actions/productAction';
import Loading from '../layout/Loading/Loading';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        error,
        products,
    } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [alert, dispatch, error]);


    return (
        <>
            {
                loading
                    ? (<Loading />)
                    : (<>
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
                            {products?.map((product, index) => <ProductCard key={index} product={product} />)}
                        </div>
                    </>)
            }
        </>
    );
};

export default Home;