import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { productReducer } from './reducers';
import {
    productsReducer,
    productDetailsReducer
} from './reducers/productReducer';

import { userReducer, profileReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;