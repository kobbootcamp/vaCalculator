import React from "react";
import SimpleSelect from "../components/Survey";
import Grid from '@material-ui/core/Grid';
import './QuestionnairePage.css';



function QuestionnairePage () {
    return (
        <div>
    <Grid container spacing = {24}>
        <Grid item xs={3}></Grid>    
        <Grid item xs={6} id="gridbox">

        <SimpleSelect
        />
        </Grid>
        <Grid item xs={3}></Grid>  
    </Grid>
                    {/* <Footer> */}
                    <Grid container spacing ={24}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <p> Disclaimer: The VA Pension Estimator is not affiliated with the U.S. Department of Veterans Affairs, and is intended for educational purposes only. Any estimate displayed is unofficial and should not be construed as a promise of monetary benefits.</p>
                      </Grid>
                      <Grid item xs={3}></Grid>
                      </Grid>
                  {/* </Footer> */}
        </div>

    );
}


export default QuestionnairePage;