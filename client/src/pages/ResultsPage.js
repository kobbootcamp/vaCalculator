import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';
import './QuestionnairePage.css';
//import ReactDOM from 'react-dom';
// import Fab from '@material-ui/core/Fab';
import './ResultsPage.css'
import Button from '@material-ui/core/Button';
import Footer from '../components/Footer';

  class Results extends Component {
    // parse the match parameter back into an integer
    amount = parseInt(this.props.match.params.amount);
    // this function will return commas for numbers greater than 999
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
   
   render() {
    return (
      <div>
      <Grid container spacing = {24}>
        <Grid item xs={12} id='surveyTitle' >Results</Grid>
        <Grid item xs={12} id='surveyText' >
          {this.amount > 0 ? "You may be eligible for...$" + this.numberWithCommas(this.amount) + ".00 per month!" :
          "Based on the information you provided, it appears you may not qualify for VA Pension benefits."}
        </Grid>
      </Grid>

      <Grid container spacing = {24}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
        <Button target="_blank" variant="outlined" id="applyButton" href="https://www.va.gov/pension/how-to-apply/">Click here to learn how to Apply</Button>
          </Grid>
          <Grid item xs={4}></Grid>
      </Grid>

      <Footer>
          <Grid container spacing ={24}>
            <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <p> Disclaimer: The VA Pension Estimator is not affiliated with the U.S. Department of Veterans Affairs, and is intended for educational purposes only. Any estimate displayed is unofficial and should not be construed as a promise of monetary benefits.</p>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
        </Footer>
      </div>

    );
  }
}


export default Results;