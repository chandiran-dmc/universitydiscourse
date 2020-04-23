import React, { Component } from 'react'
import {Button} from '@material-ui/core';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class Doc extends Component {	
    constructor(props) {	    
        super(props); 
        this.state = {
            name: props.data.name,
            open: false,
            numPages: null,
            pageNumber: 1,
            sample: null
        };	        	       	               
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    onClickDownload = () => {	 
        setTimeout(() => {
            const response = {
              file: 'http://localhost:3000/api-document/download?' + this.state.name,
            };
            window.open(response.file);
          }, 100);
    }  

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };    

    render() {	 
        const { pageNumber, numPages } = this.state;
        return ( 
            <div>   
            <Button onClick={this.handleClickOpen} ><h3>{this.state.name}</h3></Button> 
            <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                <AppBar className={useStyles.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={useStyles.title}>
                    PDF Preview | Previewing Page {this.state.pageNumber} of {this.state.numPages}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() =>this.setState({pageNumber: (this.state.pageNumber + 1 <= this.state.numPages)?this.state.pageNumber + 1:this.state.pageNumber})}>
                        Next Page
                    </Button> 
                    <Button autoFocus color="inherit" onClick={() =>this.setState({pageNumber: (this.state.pageNumber - 1 >= 1)?this.state.pageNumber - 1:this.state.pageNumber})}>
                        Previous Page
                    </Button> 
                    <Button autoFocus color="inherit" onClick={this.onClickDownload}>
                    Download
                    </Button>
                </Toolbar>
                </AppBar>
                <Grid container 
                        direction="column"
                        alignItems="center"
                        spacing={2}>
                <List>
                    <br />
                    <br />
                    <div>
                        <Document
                        file={require("./Documents/" + this.state.name)}
                        onLoadSuccess={this.onDocumentLoad}
                        >
                        <Page pageNumber={this.state.pageNumber} />
                        </Document>
                    </div>                    
                </List>
                </Grid>
          </Dialog>
          </div>
        )}
}