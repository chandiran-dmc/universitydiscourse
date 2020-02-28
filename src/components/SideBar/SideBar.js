import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Button} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const handleRequest_logout = () => {
    // if(this.state.user === localStorage.getItem("username")) {

        alert('Logout');
    // }
    // else {
    //     alert('You can not edit this post');
    // }
}

const handleRequest_password = () => {
    // if(this.state.user === localStorage.getItem("username")) {

    // }
    // else {
    //     alert('You can not edit this post');
    // }
}

const handleRequest_email = () => {
    // if(this.state.user === localStorage.getItem("username")) {

        alert('Email');
    // }
    // else {
    //     alert('You can not edit this post');
    // }
}

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left" >
        <div className={classes.toolbar} />
        <Typography 
            align="center"
            variant="h5">
            {localStorage.getItem("username") === null ? "john doe" : localStorage.getItem("username")}
        </Typography>
        <br/>
        <Divider />
        <List>
            <Button onClick={handleRequest_password}>
                Change Password
            </Button>
            <br/>
            <Button onClick={handleRequest_email}>
                Change Email
            </Button>
            <br/>
            <Button onClick={handleRequest_logout}>
                Logout
            </Button>
        </List>
      </Drawer>
    </div>
  );
}