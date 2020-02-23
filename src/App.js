import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sandbox from './components/Sandbox';
import MainFeedPage from './components/MainFeedPage'
import './App.css';

function App() {
  return (
    <div className="App">

      <Router>
        <Route exact path="/" component={MainFeedPage} />
        <Route path="/sandbox" component={Sandbox} />
      </Router>

    </div>
  );
}

export default App;
