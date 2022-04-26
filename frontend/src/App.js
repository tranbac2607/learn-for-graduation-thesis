import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
// import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Loading from './components/layout/Loading/Loading';
import ProductDetails from './components/Product/ProductDetails/ProductDetails';
import Products from './components/Product/Products/Products';
import Search from './components/Product/Search/Search';


function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Route exact path='/' component={Home} />
      <Route exact path='/sad' component={Loading} />
      <Route exact path='/product/:id' component={ProductDetails} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/products/:keyword' component={Products} />
      <Route exact path='/search' component={Search} />
      <Footer />
    </Router>
  );
}

export default App;
