/**
 * This is a react component for the footer which consists of
 * - the logo, with the name
 * - the objective
 * - explore links
 * - contact information
 * 
 * Please look at the UI mockup for image explanation
 */

import React, { Component } from 'react'
//import './Footer.css';
import logoName from '../../images/ImageName.png';
import {Grid, AppBar} from '@material-ui/core'

export default class Footer extends Component {

     render() {
        return (
            <div className="footer">
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-end"
                    spacing={1}
                    style={{background: "#F2F2F2"}}    
                >
                    <Grid item>
                        <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={1}>
                            <Grid item>
                                <img 
                                    width = {500}
                                    src={logoName}
                                    alt="logoName"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <h3 style={{ color: '#023373' }}>University discourse intends to assists students in finding solutions to their academic concerns </h3>
                    </Grid>
                    <Grid item>
                    <h3 style={{ color: '#023373' }}>Contact</h3>
                    <h3 style={{ color: '#023373' }}>Explore Links</h3>
                    </Grid>
                    {/* <div className="lowerFooter2" />         */}

                </Grid>
            </div>
        )
    }

}
