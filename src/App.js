import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreatePostPage from './components/CreatePostPage';
import MainFeedPage from './components/MainFeedPage';

export default function App() {
    return (
      
      <Router>
        <Switch>
          <Route path="/createpost">
            <CreatePostPage />
          </Route>
          <Route path="/">
            <MainFeedPage />
          </Route>

        </Switch>
      </Router>
    );
}
