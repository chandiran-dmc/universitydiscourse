import React, { Component } from 'react'	
import Doc from './Document'

import { Grid } from '@material-ui/core';
import sample from './sample.pdf'
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';
const axios = require('axios');


export default class CoursePage extends Component {	
    constructor(props) {	    
        super(props);	        
        var location = window.location.href;	       
        var result = location.substring(location.lastIndexOf("/") + 1);	        
        var pos = result.indexOf('?');	       
        if ( pos < 0 ) pos = result.length;	     
        result = result.substring(0, pos);	       
        this.state = {	    
            id: result,	 
            selectedFile: null,	    
            documentlist: [],
        };	           	               
    }

    onChangeHandler=event=>{	 
        console.log(event.target.files[0])	     
        this.setState({	      
            selectedFile: event.target.files[0],	          
        })
    }

    onClickHandler = () => {
        const data = new FormData() 	       
        data.append('doc', this.state.selectedFile)	     
        axios.post("http://localhost:3000/api-document/document-upload", data, {	        
        }).then(res => {	     
            console.log(res)	       
        })	   
        .catch((error) => {
            console.error(error);
            alert('You can only attach pdf\'s');
        });      
        console.log(data);	    
    }   

    fetchDocuments = async () => {
        axios.post("http://localhost:3000/api-document/getDocuments", {	        
        }).then((response) => {
            let documents = [];
            let documentlist = [];
            documents = response.data.data;
            console.log(response.data.data);
            documents.forEach((document) => {
                documentlist.push(<Doc key={Math.random()*100000} data={document}/>);
            });
            this.setState({
                documentlist: documentlist
            });
        })
        .catch((error) => {
            console.error(error);
            alert('An error occurred');
        });  
    } 

    componentDidMount() {
        this.fetchDocuments();
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }
    

    render() {	 

        const { pageNumber, numPages } = this.state;

        return (	  
            <Grid>	       
                <Grid item>	         
                    {this.state.id}	                 
                </Grid>	            
                <Grid item>	        
                    	                    
                    <input type="file" name="file" onChange={this.onChangeHandler}/>	                 
                    	                    
                </Grid>	              
                <Grid item>	             
                    	                    
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>                     	                
                </Grid>	        
                <Grid item>	             
                    	                    
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickDownload}>Download</button>                     	                
                </Grid>	       
                <Grid item>	             	                    
                    {this.state.documentlist}            	                
                </Grid>    
            </Grid>	        
        )
    }
}


