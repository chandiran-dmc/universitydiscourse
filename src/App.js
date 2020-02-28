import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CreatePostPage from './components/CreatePostPage';
import LoginPage from './components/LoginPage'
import ChangeEmail from './components/ChangeEmail'
import ChangePassword from './components/ChangePassword'
import RecoverPassword from './components/RecoverPassword'
import RegisterPage from './components/RegisterPage'
import SendLink from './components/SendLink'
import MainFeedPage from './components/MainFeedPage';
import EntryPage from './components/EntryPage/EntryPage';

export default function App() {
    return (

      <Router>
        <Switch>
          {/* <Route exact path="/" component={MainFeedPage} /> */}
          <Route exact path="/createpost" component={CreatePostPage} />
          <Route exact path="/editpost" component={CreatePostPage} />
          <Route path="/lp" component = {LoginPage} />
          <Route path="/recp" component = {RecoverPassword} />
          <Route path="/rp" component={RegisterPage} />
          <Route path="/mp" component={MainFeedPage}/>
          <Route exact path="/" component = {EntryPage} />
          <Route exact path="/sendlink" component={SendLink} />
          <Route exact path="/changeemail" component={ChangeEmail} />
          <Route exact path="/changepassword" component={ChangePassword} />
        </Switch>
      </Router>
    );
}
