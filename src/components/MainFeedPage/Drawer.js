import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import DeleteIcon from '@material-ui/icons/Delete';
import FollowingTags from '../SideBar/FollowingTags';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Grid } from '@material-ui/core';

import { createMuiTheme } from '@material-ui/core';
const axios = require('axios');

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
    },

    logoutButton: {
    },
grow: {
    flexGrow: 1,
},
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isRedirect, setisRedirect] = React.useState(false);
  const [path, setPath] = React.useState("");
  const [tags, setTags] = React.useState();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRequest_password = () => {
    setPath("/changepassword");
    setisRedirect(!isRedirect);
};

const handleRequest_email = () => {
    setPath("/changeemail");
    setisRedirect(!isRedirect);
}

const handleRequest_remove = async () => {

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

    // delete user account
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

    setPath("/");
    setisRedirect(!isRedirect);
    
}

const getFollowingTags = () => {
        
    // Filter the posts based on the tags the user follows
    if (localStorage.getItem("tags") != null) {
        let tagsList =  localStorage.getItem("tags").split(",");
        // this.setState({
        //     tags: <FollowingTags tags={tagsList}/>
        // });
        
        setTags(<FollowingTags tags={tagsList}/>);
    } 
}


  if (isRedirect) {
    return <Redirect exact from="/mp" push to={{
        pathname: path,
    }}/>;
}

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <br />
      <br /><br />
      <Divider />
      <List>
      <ListItem button key={"text"} onClick={handleRequest_password}>
            <ListItemIcon><VpnKeyIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Change Password</h3>
      </ListItem>
      <ListItem button key={"text"} onClick={handleRequest_email}>
            <ListItemIcon><EmailIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Change Email</h3>
      </ListItem>
      <ListItem button key={"text"} onClick={handleRequest_remove}>
            <ListItemIcon><DeleteIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Remove Account</h3>
      </ListItem>
      {/* <Button onClick={handleRequest_email}><h3 style={{ color: '#023373' }}>Change Email</h3></Button> */}
      {/* <Button onClick={handleRequest_remove}><h3 style={{ color: '#023373' }}>Remove Account</h3></Button> */}
      
      </List>
      <Divider />
      <ListItem button key={"text"} onClick={getFollowingTags}>
            <ListItemIcon><ExpandMoreIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Following Tags</h3>
      </ListItem>
      {tags}
      <Divider />



    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            University Discourse
          </Typography> */}
          <Typography>
          <h3 style={{ color: '#023373' }}>
                                  University Discourse
                                    </h3>
                                    </Typography>
          <div className = {classes.grow} />
          <div className = {classes.logoutButton}>
        <IconButton type="button"><ExitToAppIcon color="post_primary"/></IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default ResponsiveDrawer;
