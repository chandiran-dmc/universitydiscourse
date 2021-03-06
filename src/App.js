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
import TopFeedPage from './components/TopFeedPage';
import FilterFeedPage from './components/FilterFeedPage';
import PostPage from './components/PostPage';
import EntryPage from './components/EntryPage/EntryPage';
import CoursePage from './components/CoursePage';
import ReportPost from './components/ReportPost/ReportPost';
import TagSearch from './components/TagSearch'
import TitleSearch from './components/TitleSearch'
import Footer from './components/Footer';
import './App.css';


export default function App() {
    return (
        <div className="Site">
            <div className="Site-Content">
                <Router>
                    <Switch>
                        {/* <Route exact path="/" component={MainFeedPage} /> */}
                        <Route exact path="/createpost" component={CreatePostPage} />
                        <Route exact path="/editpost" component={CreatePostPage} />
                        <Route path="/reportpost" component = {ReportPost} />
                        <Route path="/lp" component = {LoginPage} />
                        <Route path="/recp" component = {RecoverPassword} />
                        <Route path="/rp" component={RegisterPage} />
                        <Route exact path="/mp" component={MainFeedPage}/>
                        <Route exact path="/tfp" component={TopFeedPage}/>
                        <Route exact path="/ffp" component={FilterFeedPage}/>
                        <Route exact path="/" component = {EntryPage} />
                        <Route exact path="/sendlink" component={SendLink} />
                        <Route exact path="/changeemail" component={ChangeEmail} />
                        <Route exact path="/changepassword" component={ChangePassword} />
                        <Route exact path="/searchtag" component={TagSearch} />
                        <Route exact path="/searchtitle" component={TitleSearch} />
                        <Route exact path="/course/:id" component={CoursePage} />
                        <Route exact path="/post/:id" component={PostPage} />
                    </Switch>
                </Router>
            </div>
            <div className="Site-Footer" style={{marginTop: "5%"}}>
                <Footer/>
            </div>
        </div>

    );
}
