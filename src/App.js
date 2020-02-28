import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreatePostPage from './components/CreatePostPage';
import LoginPage from './components/LoginPage'
import ChangeEmail from './components/ChangeEmail'
import ChangePassword from './components/ChangePassword'
import RecoverPassword from './components/RecoverPassword'
import RegisterPage from './components/RegisterPage'
import MainFeedPage from './components/MainFeedPage';
import EntryPage from './components/EntryPage/EntryPage';

export default function App() {
    return (

      <Router>
        <Switch>
        
          <Route path="/lp" component = {LoginPage} />
          <Route path="/rp" component = {RegisterPage} />

          <Route exact path="/" component = {RecoverPassword} />
          

        </Switch>
      </Router>
    );
}
