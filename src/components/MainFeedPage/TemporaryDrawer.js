import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Redirect} from 'react-router-dom';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const axios = require('axios');

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    
  });
  const [isRedirect, setisRedirect] = React.useState(false);
  const [path, setPath] = React.useState("");
  const [username, setUsername] = React.useState("");
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const getUserName = async () => {

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
        setUsername(username);

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


  const onSubmit2 = (event) => {
    setPath("/tfp");
    setisRedirect(!isRedirect);
} 
 const onSubmit3 = (event) => {
    setPath("/ffp");
    setisRedirect(!isRedirect);
} 

const redirectSearch = (event) => {
    setPath("/searchtag");
    setisRedirect(!isRedirect);
}

const redirectTitleSearch = (event) =>{
    setPath("/searchtitle");
    setisRedirect(!isRedirect);
}

  if (isRedirect) {
    return <Redirect exact from="/mp" push to={{
        pathname: path,
    }}/>;
}

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key={"text"} onClick={onSubmit2}>
            <ListItemIcon><AccountCircleIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>{username}</h3>
          </ListItem>
        
         <ListItem button key={"text"} onClick={onSubmit2}>
            <ListItemIcon><TrendingUpIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Top Feed Page</h3>
        </ListItem>
         <ListItem button key={"text"} onClick={onSubmit3}>
            <ListItemIcon><FilterListIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Filter Page</h3>
        </ListItem>
         <ListItem button key={"text"} onClick={redirectSearch}>
            <ListItemIcon><SearchIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Search based on Tag</h3>
        </ListItem>
        <ListItem button key={"text"} onClick={redirectTitleSearch}>
            <ListItemIcon><FindInPageIcon color="primary"/></ListItemIcon>
          <h3 style={{ color: '#023373' }}>Search based on Title</h3>
        </ListItem> 
      </List>
    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><h3 style={{ color: '#023373' }}>OPTIONS</h3></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
