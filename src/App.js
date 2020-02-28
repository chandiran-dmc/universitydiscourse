import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CreatePostPage from './components/CreatePostPage';
import MainFeedPage from './components/MainFeedPage';
import SignUpPage from './components/SignUpPage';

export default function App() {
    return (

      <Router>
        <Switch>
          <Route exact path="/" component={MainFeedPage} />
          <Route exact path="/createpost" component={CreatePostPage} />
          <Route exact path="/editpost" component={CreatePostPage} />
          <Route exact paht="/entry" component={SignUpPage} />
        </Switch>
      </Router>
    );
}
