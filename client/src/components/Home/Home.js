import Grid from '@material-ui/core/Grid';
import React from 'react';
import "../Home/Home.css"
import Footer from '../Footer';


  function Home () {
    return (
      <div>
        <Grid container spacing = {24}>
              <Grid item xs={12} id='homeTitle'>What is the VA Pension Estimator?</Grid>
              
              <Grid item xs={2}></Grid>

              <Grid item xs={8} id='homeText'>
                  The U.S. Department of Veterans Affairs (the VA) administers an income-assistance program
                  called Veterans Pension (or, in the case of dependents who survive a deceased veteran,
                  Survivors Pension) about which many misperceptions exist. There are many income-related
                  factors that determine the monthly Pension rate to which a veteran or veteran’s surviving
                  dependent may be entitled. While there are pages upon pages of documents on the VA’s
                  website and on other websites explaining how the Pension rate may be calculated, there isn’t a
                  simple, intuitive ballpark estimate calculator that potential applicants can use.
                  Potential applicants may use this application to estimate their potential Pension rate. 
                  Potential applicants may use this estimate to inform their decision as to whether
                  they wish to initiate an often lengthy application process.
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


export default Home;