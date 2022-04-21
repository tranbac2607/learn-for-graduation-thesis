import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';


function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Route exact path='/' component={Home} />
      <Footer />
    </Router>
  );
}

export default App;
