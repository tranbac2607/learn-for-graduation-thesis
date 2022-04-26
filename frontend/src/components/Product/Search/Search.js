import React, { useState } from 'react';
import MetaData from '../../layout/MetaData';

import './Search.css';

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push('/products');
        }
    }

    return (
        <>
            <MetaData title='ECOMMERCE -- Search A Product' />
            <form
                action=""
                className="search__box"
                onSubmit={handleSearchSubmit}
            >
                <input
                    className='search__box-enter'
                    type="text"
                    placeholder='Search a Product ...'
                    onChange={e => {
                        setKeyword(e.target.value)
                    }}
                />
                <input
                    className='search__box-submit'
                    type="submit"
                    value='Search' />
            </form>
        </>
    );
};

export default Search;

