import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './App.css';
// import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Loading from './components/layout/Loading/Loading';
import ProductDetails from './components/Product/ProductDetails/ProductDetails';
import Products from './components/Product/Products/Products';
import Search from './components/Product/Search/Search';
import LoginSignUp from './components/User/LoginSignUp/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';


function App() {

    const {
        user,
        isAuthenticated,
    } = useSelector(state => state.user);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Router>
            {/* <Header /> */}
            {isAuthenticated && <UserOptions user={user} />}
            <Route exact path='/' component={Home} />

            <Route exact path='/sad' component={Loading} />

            <Route exact path='/product/:id' component={ProductDetails} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:keyword' component={Products} />

            <Route exact path='/login' component={LoginSignUp} />
            <ProtectedRoute exact path='/account' component={Profile} />

            <Route exact path='/search' component={Search} />
            <Footer />
        </Router>
    );
};

export default App;
