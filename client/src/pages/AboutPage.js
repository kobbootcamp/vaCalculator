import Grid from '@material-ui/core/Grid';
import React from 'react';
import "./AboutPage.css";
import Footer from '../components/Footer';

function AboutPage() {
    return(
        <div>
            <Grid container spacing = {24}>
              <Grid item xs={12} id='AboutTitle'>The Team</Grid>
              
              <Grid item xs={2}></Grid>

              <Grid item xs={8} id='AboutText'>
                <div className = "row">
                    <p id = "about">We are a team of coding boot camp students, who came together to create a react-based application that estimates the VA pension for which some people may be eligible.</p>
                </div>
                <br/>
                <br/>
                <div className = "row">
                    <Grid item xs={4}>Eric Hove</Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://github.com/eghove">GitHub </a></Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://eghove.github.io/">Portfolio</a></Grid>
                </div>
                <div className = "row">
                    <Grid item xs={4}>Kevin O'Brien</Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://github.com/kobbootcamp">GitHub</a></Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://kobbootcamp.github.io/BlendedPortfolio/">Portfolio</a></Grid>
                </div>
                <div className = "row">
                    <Grid item xs={4}>Mark SperleWeiler</Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://github.com/mdsw81">GitHub</a></Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://mdsw81.github.io/Portfolio/">Portfolio</a></Grid>
                </div>
                <div className = "row">
                    <Grid item xs={4}>Spencer Caretta</Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://github.com/SpencerCaretta">GitHub</a></Grid>
                    <Grid item xs={4}><a target="_blank" rel="noopener noreferrer" href = "https://spencercaretta.github.io/Portfolio-Template/">Portfolio</a></Grid>
                </div>
              </Grid>

              <Grid item xs={2}></Grid>
            </Grid>

            <Footer>
                <Grid container spacing={24}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <p> Disclaimer: The VA Pension Estimator is not affiliated with the U.S. Department of Veterans Affairs, and is intended for educational purposes only. Any estimate displayed is unofficial and should not be construed as a promise of monetary benefits.</p>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Footer>

        </div>
    )


}

export default AboutPage;