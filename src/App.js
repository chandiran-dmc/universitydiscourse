import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreatePostPage from './components/CreatePostPage';
import LoginPage from './components/LoginPage'
import MainFeedPage from './components/MainFeedPage';

export default function App() {
    return (

      <Router>
        <Switch>
        <Route 
          path='/lp'
          render={LoginPage}
        />
          <Route path="/mp" component = {MainFeedPage} />
          <Route exact path="/">
            <LoginPage />
          </Route>

        </Switch>
      </Router>
    );
}
