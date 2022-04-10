import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Header from './component/layout/Header.js';

function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
