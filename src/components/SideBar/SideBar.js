import React, { Component } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FollowingTags from './FollowingTags';
import {Button} from '@material-ui/core';
import {Redirect} from 'react-router-dom';


import sample_user from '../../mock_data/user_data.json';

const axios = require('axios');
// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   }
// }));

export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isRedirect: false,
            to: ""
        };
    }

    handleRequest_password = () => {
        this.setState({
            isRedirect: true,
            to: "/changepassword"
        });
    }
    
    handleRequest_email = () => {
        this.setState({
            isRedirect: true,
            to: "/changeemail"
        });
    }
    
    handleRequest_logout = () => {

        // Clear local storage
        localStorage.removeItem("email");
        localStorage.removeItem("username");

        this.setState({
            isRedirect: true,
            to: "/"
        });
    }

    handleRequest_remove = async () => {

        // delete all post made by the user
        axios({
            method: 'delete',
            url: 'http://localhost:3000/api/removeallposts',
            data: {
                user: localStorage.getItem("username")
            }
        })
        .then((response) => {
            localStorage.removeItem("username");
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

        // deletet user account
        axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/deleteuser',
            data: {
                email: localStorage.getItem("email")
            }
        })
        .then((response) => {
            localStorage.removeItem("email");
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

        this.setState({
            isRedirect: true,
            to: "/"
        });
    }

    /**
     * Helper function to get the tags that the user follows
     */
    getFollowingTags = () => {
        // TODO: Get user data from local file
        let user = sample_user; // XXX
        // Filter the posts based on the tags the user follows
        let tagsList =  user.tags;
        return <FollowingTags tags={tagsList}/>;
    }

    getUserName = () => {
        this.setState({
            username: localStorage.getItem("username"),
            isRedirect: false,
            to: ""
        });
    }

    componentDidMount() {
        this.getUserName();
    }

    render() {

        // Redirection
        if (this.state.isRedirect) {

            console.log("SideBar >> redirecting to : " + this.state.to);

            return <Redirect exact from="/mp" push to={{
                pathname: this.state.to,
                state: { type: this.state.to }
            }}/>;
        }

        return (
          <div>
            <CssBaseline />
            <Drawer
              variant="permanent"
              anchor="left" >
              <div />
              <br/><br/><br/><br/>
              <Typography 
                  align="center"
                  variant="h5">
                  {this.state.username}
              </Typography>
              <br/><br/><br/>
              <Typography 
                  align="left"
                  variant="h6">
                  Profile
              </Typography>
              <br/>
              <Divider />
              <List>
                  <Button onClick={this.handleRequest_password}>
                      Change Password
                  </Button>
                  <br/>
                  <Button onClick={this.handleRequest_email}>
                      Change Email
                  </Button>
                  <br/>
                  <Button onClick={this.handleRequest_remove}>
                      Remove Account
                  </Button>
                  <br/>
                  <Button onClick={this.handleRequest_logout}>
                      Logout
                  </Button>
              </List>
              <br/>
              <Divider />
              <br/><br/>
              <Typography 
                  align="left"
                  variant="h6">
                  Following Tags
              </Typography>
              <br/>
              <Divider />
              {this.getFollowingTags()}
              <br/>
              <Divider/>
            </Drawer>
          </div>
        );
    }
}