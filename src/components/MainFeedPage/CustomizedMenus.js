import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalIcon from '../../customeIcons/calIcon';
import { Redirect } from 'react-router-dom';
import ImageIcon from '../../customeIcons/imageIcon';
import LinkIcon from '../../customeIcons/linkIcon';
import TextIcon from '../../customeIcons/textIcon';
import GradeIcon from '../../customeIcons/gradeIcon';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default class CustomizedMenus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            toCreatePostPage: false,
            type: "",
        };
    }

  handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    // setAnchorEl(null);
    this.setState({anchorEl: null})
  };

  handleCreatePost = (type) => {
    this.setState({
        toCreatePostPage: true,
        type: type
    });
    }

  
  render() {

    if (this.state.toCreatePostPage === true) {

        console.log("ActionBar >> create a post of type : " + this.state.type);

        return <Redirect exact from="/" push to={{
            pathname: "/createpost",
            state: { type: this.state.type }
        }}/>;
    }
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        size = "large"
        color="primary"
        onClick={this.handleClick}
      >
        Create Post
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <StyledMenuItem onClick={() => {this.handleCreatePost("text")}}>
          <ListItemIcon>
            <TextIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {this.handleCreatePost("image")}}>
          <ListItemIcon>
            <ImageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {this.handleCreatePost("calendar")}}>
          <ListItemIcon>
            <CalIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {this.handleCreatePost("link")}}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Link" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {this.handleCreatePost("grade")}}>
          <ListItemIcon>
            <GradeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Grade" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => {this.handleCreatePost("curve")}}>
          <ListItemIcon>
            <GradeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Curve" />
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
  }
}
