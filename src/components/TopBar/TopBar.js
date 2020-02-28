// /**
//  * This is a react component for the top bar which consists of
//  * - a search field
//  * - a search button
//  * - a profile image button (depending user state)
//  * - logo button
//  * 
//  * Please look at the UI mockup for image explanation
//  */

// import React, { Component } from 'react';
// import './TopBar.css';
// import logo from '../../images/image1.png';

// export default class TopBar extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             value: ''
//         };

//         // Binding is required so that the function can access the context
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSearch = this.handleSearch.bind(this);
//     }

//     // save the value of input whenever a user enters sth
//     handleChange(event) {
//         this.setState(
//             {
//                 value: event.target.value
//             }
//         );
//     }

//     // user clicked on search
//     // TODO: route to search page
//     handleSearch(event) {
//         // This is to stop the default behavior, 
//         // which in this case is stopping form from reloading itself
//         event.preventDefault();
//         alert('Searching for ' + this.state.value);
//     }

//     // The input form value is controlled by react = controlled components
//     render() {
//         return (
//             <div className="TopBar">
//                 <form 
//                     onSubmit={this.handleSearch}>
//                     <img 
//                         className="Logo"
//                         src={logo}
//                         alt="logo"
//                     />
//                     <input 
//                         className="SearchText"
//                         type="text" 
//                         value={this.state.value}
//                         placeholder="Search.."
//                         onChange={this.handleChange} 
//                     />
//                     <input 
//                         className="SearchButton"
//                         type="submit" 
//                         value="" 
//                     />
                    
//                 </form>
//             </div>
//         )
//     }
// }

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'


const theme = createMuiTheme ({
  palette: {
      primary: {
          main:'#023373',
      }
  }

});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
     
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color='inherit'
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            University Discourse
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
    </ThemeProvider>
  );
}