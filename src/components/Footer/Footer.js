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
import './Footer.css';
import logo from '../../images/image1.png';
import logoName from '../../images/ImageName.png';
import {Grid, Box} from '@material-ui/core'

export default class Footer extends Component {

     render() {
        return (
            <div className="Footer">
            {/* <Box
                boxShadow={2}
                margin={1}
                padding={2}
                bgcolor="#F2F2F2"> */}
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-end"
                    spacing={1}
                    >
                    <Grid item>
                        <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={1}>
                            {/* <Grid item>
                                <img 
                                    width = {100}
                                    src={logo}
                                    alt="logo"
                                />
                            </Grid> */}
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
            {/* </Box> */}
            </div>
        )
    }

}
