import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CreatePostPage from './components/CreatePostPage';
import MainFeedPage from './components/MainFeedPage';

export default function App() {
    return (

      <Router>
        <Switch>
          <Route path="/createpost" component={CreatePostPage} />
          <Route exact path="/" component={MainFeedPage} />
        </Switch>
      </Router>
    );
}
