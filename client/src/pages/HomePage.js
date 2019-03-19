import Grid from '@material-ui/core/Grid';
import React from 'react';
import "./HomePage.css"
import Footer from '../components/Footer';


  function HomePage () {
    return (
      <div>
        <Grid container spacing = {24}>
              <Grid item xs={12} id='homeTitle'>What is the VA Pension Estimator?</Grid>
              
              <Grid item xs={2}></Grid>

              <Grid item xs={8} id='homeText'>
                The U.S. Department of Veterans Affairs (the VA) administers an income-assistance program called Veterans Pension (or, in the case of dependents who survive a deceased veteran, Survivors Pension) about which many misperceptions exist. There are many income-related factors that determine the monthly Pension rate to which a veteran or veteran’s surviving dependent may be entitled. Potential applicants may use this application to estimate their potential Pension rate. 
              </Grid>

              <Grid item xs={2}></Grid>
          </Grid>
                <Footer>
                  <Grid container spacing ={24}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                    <p> Disclaimer: The VA Pension Estimator is not affiliated with the U.S. Department of Veterans Affairs, and is intended for educational purposes only. Any estimate displayed is unofficial and should not be construed as a promise of monetary benefits.</p>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    </Grid>
                </Footer>

      </div>
    );
  }


export default HomePage;