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
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';


const axios = require('axios');


const theme = createMuiTheme ({
  palette: {
      primary: {
          main:'#023373',
      }
  }

});


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
            to: "",
            tags: null
        };
    }

    handleRequest_password = () => {
        this.setState({
            username: this.state.username,
            isRedirect: true,
            to: "/changepassword",
            tags: this.state.tags
        });
    }
    
    handleRequest_email = () => {
        this.setState({
            username: this.state.username,
            isRedirect: true,
            to: "/changeemail",
            tags: this.state.tags
        });
    }
    
    handleRequest_logout = () => {

        // Clear local storage
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("tags");

        this.setState({
            username: this.state.username,
            isRedirect: true,
            to: "/",
            tags: this.state.tags
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
            localStorage.removeItem("tags");
            localStorage.removeItem("username");
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

        this.setState({
            username: this.state.username,
            isRedirect: true,
            to: "/",
            tags: this.state.tags
        });
    }

    getUserName = async () => {

        await axios({
            method: 'post',
            url: 'http://localhost:3000/api-user/getuser',
            data: {
                email: localStorage.getItem("email")
            }
        })
        .then((response) => {
            let username = response.data.data.username;
            localStorage.setItem('username', username);

            this.setState({
                username: username,
                isRedirect: false,
                to: "",
                tags: this.state.tags
            });
            
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });
    }

    /**
     * Helper function to get the tags that the user follows
     */
    getFollowingTags = () => {
        
        // Filter the posts based on the tags the user follows
        if (localStorage.getItem("tags") != null) {
            let tagsList =  localStorage.getItem("tags").split(",");
            this.setState({
                username: this.state.username,
                isRedirect: this.state.isRedirect,
                to: this.state.to,
                tags: null
            });
            this.setState({
                username: this.state.username,
                isRedirect: this.state.isRedirect,
                to: this.state.to,
                tags: <FollowingTags tags={tagsList}/>
            });
        } else {
            this.setState({
                username: this.state.username,
                isRedirect: this.state.isRedirect,
                to: this.state.to,
                tags: null
            });
        }
    }

    componentDidMount() {
        this.getUserName();
        this.getFollowingTags();

        setInterval(this.getFollowingTags, 1000);
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
            <ThemeProvider theme={theme}>
          <div>
            <CssBaseline />
            <Drawer
              variant="permanent"
              anchor="left"
             >
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
                {this.state.tags}
              <br/>
              <Divider/>
            </Drawer>
          </div>
          </ThemeProvider>
        );
    }
}