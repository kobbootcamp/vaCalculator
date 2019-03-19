
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Popover from '../Popover';
// pull in estimator API call
import API from '../../utils/API';
// pull in estimator logic
import baseRate from '../../utils/baserate';
import estimator from '../../utils/estimator';
import "../Survey/survey.css"


  const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'red',
      }
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit,
    },
  });
  
  class SimpleSelect extends React.Component {

    state = {
      as: '',
      ben: '',
      dependents: '',
      calcDate: '',
      selfSSIn: 0,
      depSSIn: 0,
      selfRetireIn: 0,
      depRetireIn: 0,
      selfOtherIn1: 0,
      depOtherIn1: 0,
      selfOtherIn2: 0,
      depOtherIn2: 0,
      selfMedPartBEx: 0,
      depMedPartBEx: 0,
      selfPrivMedIns: 0,
      depPrivMedIns: 0,
      selfOtherEx1: 0,
      depOtherEx1: 0,
      selfOtherEx2: 0,
      depOtherEx2: 0,
      name: '',
      labelWidth: 4000,
      rates: '',
      incomeArray: [0],
      expensesArray: [0],
      monthlyRate: 'None',
      // pull in the user information 
      user: localStorage.getItem('user')
    };
  
    getEstimatesAndAssign = () => {
      if (this.state.user) {
        API.getEstimates(this.state.user)
          .then((res) => {
            // there a non-crash error around here that I want to fix
            if (res.data.estimates) {
              let priorData = res.data.estimates[0];
              this.setState({
                selfSSIn: priorData.youSSA,
                selfRetireIn: priorData.youRtmt,
                selfOtherIn1: priorData.youOthInc1,
                selfOtherIn2: priorData.youOthInc2,
                depSSIn: priorData.depSSA,
                depRetireIn: priorData.depRtmt,
                depOtherIn1: priorData.depOthInc1,
                depOtherIn2: priorData.depOthInc2,
                selfMedPartBEx: priorData.youMedB,
                selfPrivMedIns: priorData.youPMI,
                selfOtherEx1: priorData.youOthExp1,
                selfOtherEx2: priorData.youOthExp2,
                depMedPartBEx: priorData.depMedB,
                depPrivMedIns: priorData.depPMI,
                depOtherEx1: priorData.depOthExp1,
                depOtherEx2: priorData.depOthExp2
              });
            }
          })
          .catch(() => console.log("There was no prior data."))
      }
    }

    componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        user: localStorage.getItem('user')
      });
      API.createUser( {userID: this.state.user})
      this.getEstimatesAndAssign();
    }
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    // estimator functions

    aggregateIncome = (deps, amt1, amt2, amt3, amt4, depAmt1, depAmt2, depAmt3, depAmt4) => {
      // if no dependents
      if (parseInt(deps) < 1) {
        this.setState( {incomeArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4)]});
      } else {
        this.setState( {incomeArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4), parseFloat(depAmt1), parseFloat(depAmt2), parseFloat(depAmt3), parseFloat(depAmt4) ]});
      }
    }


    aggregateExpenses = (deps, amt1, amt2, amt3, amt4, depAmt1, depAmt2, depAmt3, depAmt4) => {
      // if no dependents
      if (parseInt(deps) < 1) {
        this.setState( {expensesArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4)]});
      } else {
        this.setState( {expensesArray: [parseFloat(amt1), parseFloat(amt2), parseFloat(amt3), parseFloat(amt4), parseFloat(depAmt1), parseFloat(depAmt2), parseFloat(depAmt3), parseFloat(depAmt4) ]});
      }
    }
    // function to insure all values are zero or greater

    validateAmounts = (array) => {
      let isValid = true;
      for (let i = 0; i < array.length; i++) {
        if (array[i] < 0) {
          isValid = false;
        }
      }
      return isValid;
    }

    // function validate no null
    validateNotNull = (array) => {
      let isValid = true;
      for (let i = 0; i < array.length; i++) {
        if ( isNaN(array[i])  ) {
          isValid = false
        }
      }
      return isValid;
    }

    // function to validate there is a value for calc date
    validateCalcDate = (value) => {
      if ( typeof(value) !== "string" || value <= 0) {
        alert("Please select a date value for 'Caclulate my VA Pension estimate from...'")
      }
    }

    handleCalculateButton = event => {
      event.preventDefault();

      // validating a value has been entered for estimate date
      this.validateCalcDate(this.state.calcDate);

      // get the rates needed for the estimator, store them in state
      API.getRates(this.state.calcDate, this.state.as)
        .then(res =>
          this.setState({ rates: res.data })
        )
        // aggregate all the income values into an array that the estimator can read.
        .then(() => {
          this.aggregateIncome(
            this.state.dependents, this.state.selfSSIn, this.state.selfRetireIn, this.state.selfOtherIn1, this.state.selfOtherIn2, this.state.depSSIn, this.state.depRetireIn, this.state.depOtherIn1, this.state.depOtherIn2
          );
          this.aggregateExpenses(
            this.state.dependents, this.state.selfMedPartBEx, this.state.selfPrivMedIns, this.state.selfOtherEx1, this.state.selfOtherEx2, this.state.depMedPartBEx, this.state.depPrivMedIns, this.state.depOtherEx1, this.state.depOtherEx2
          );
          // if all the information in the arrays is 0 or greater, then take the user to the rates display
          if (
            this.validateAmounts(this.state.incomeArray) === true &&
            this.validateAmounts(this.state.expensesArray) === true &&
            this.validateNotNull(this.state.incomeArray) === true &&
            this.validateNotNull(this.state.expensesArray) === true
            ) {
            let monthlyRate =
              estimator.monthlyRate(this.state.incomeArray, this.state.expensesArray,
                baseRate.calculateMAPR(this.state.as, parseInt(this.state.dependents), this.state.ben, this.state.rates[0]), baseRate.baseRateforMeds(this.state.as, parseInt(this.state.dependents), this.state.rates[0]));
            window.location.replace("/results/" + monthlyRate);
          // if any of the information in the arrays is less than 0, keep the user on /questions to try again
          } else {
            alert("Please make sure any value entered in Monthly Income and Monthly Expenses is greater than or equal to zero.");
          }
        })
        // store all the data entered in the survey/?rre when the user his the calculate button
        .then(() => {
          API.postSurveyData(this.state.user, {
            additionalBenefits: this.state.ben,
            dependentNumber: this.state.dependents,
            youSSA: this.state.selfSSIn,
            youRtmt: this.state.selfRetireIn,
            youOthInc1: this.state.selfOtherIn1,
            youOthInc2: this.state.selfOtherIn2,
            depSSA: this.state.depSSIn,
            depRtmt: this.state.depRetireIn,
            depOthInc1: this.state.depOtherIn1,
            depOthInc2: this.state.depOtherIn2,
            youMedB: this.state.selfMedPartBEx,
            youPMI: this.state.selfPrivMedIns,
            youOthExp1: this.state.selfOtherEx1,
            youOthExp2: this.state.selfOtherEx2,
            depMedB: this.state.depMedPartBEx,
            depPMI: this.state.depPrivMedIns,
            depOthExp1: this.state.depOtherEx1,
            depOthExp2: this.state.depOtherEx2,
            effectiveDate: this.state.calcDate,
            applyingAs: this.state.as
          });
          
        })
        .catch(err => console.log(err));
    }
  
    render() {
      const { classes } = this.props;
  
      return (
        <form className={classes.root} autoComplete="off" >

        <Grid container spacing = {24}>
 
        <Grid item xs={12} id='surveyTitle' >Survey Questions</Grid>
        
          <Grid item sm ={12} xs={12}>
                <FormControl className={classes.formControl} fullWidth ={true} >
                  <InputLabel
                  >
                    I am applying as a ...
                  </InputLabel>

                  <Select
                    value={this.state.as}
                    onChange={this.handleChange}
                    labelWidth={this.state.labelWidth}
                    inputProps={{
                      name: 'as',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value={"Veteran"}>Veteran</MenuItem>
                    <MenuItem value={"Surviving Spouse"}>Surviving Spouse</MenuItem>
                    <MenuItem value={"Surviving Child"}>Surviving Child</MenuItem>
                  </Select>
                </FormControl> 
                <Popover>
                  If you are considering applying as a Veteran, you must meet the eligibility requirements described <a target = "_blank" rel = "external noopener noreferrer" href = "https://www.va.gov/pension/eligibility/" >here.</a>
                    <br />  
                  If you are considering applying as a Surviving Spouse (of a deceased Veteran) or Surviving Child (of a deceased Veteran), you must meet the eligibility requirements described <a target = "_blank" rel = "external noopener noreferrer" href = "https://www.va.gov/pension/survivors-pension/" >here.</a>
                    <br />
                  Click anywhere outside this box to exit this explanation.
                </Popover>                
          </Grid>  

          <Grid item sm = {12} xs={12}>
                <FormControl className={classes.formControl} fullWidth ={true}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    I am applying for one of the following additional benefits…
                  </InputLabel>

                  <Select
                    value={this.state.ben}
                    onChange={this.handleChange}
                    labelWidth={this.state.labelWidth}
                    inputProps={{
                      name: 'ben',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"Housebound"}>Housebound</MenuItem>
                    <MenuItem value={"Aid and Attendance"}>Aid and Attendance</MenuItem>
                  </Select>
                </FormControl>
                <Popover>
                  There are additional benefits that a Veteran or Surviving Spouse may qualify for if they are housebound or require the aid and attendance of another person. To learn about the criteria for these additional benefits, please click <a target = "_blank" rel = "external noopener noreferrer" href = "https://www.benefits.va.gov/pension/aid_attendance_housebound.asp">here.</a>
                    <br />  
                  If you do not intend to apply for these benefits, please select “None” from the dropdown menu.                    
                    <br />
                  Click anywhere outside this box to exit this explanation.
                </Popover>            
          </Grid>

          <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth ={true}>
              
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      I have the following number of dependents…
                    </InputLabel>

                    <Select
                      value={this.state.dependents}
                      onChange={this.handleChange}
                      labelWidth={this.state.labelWidth}
                      inputProps={{
                        name: 'dependents',
                        id: 'age-simple',
                      }}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </FormControl>
                  <Popover>
                    The number of your dependents (which includes your spouse and any eligible children) could affect potential benefits. To learn more about the criteria for dependents, please click <a target = "_blank" rel = "external noopener noreferrer" href = "https://www.va.gov/disability/add-remove-dependent/">here.</a>
                      <br />  
                    Click anywhere outside this box to exit this explanation.
                  </Popover> 
            </Grid>

            <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth ={true}>
                    {/* <InputLabel htmlFor="age-simple"> I am applying for one of the following additional benefits…</InputLabel> */}
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-age-simple"
                    >
                      Calculate my VA Pension estimate from ...
                    </InputLabel>

                    <Select
                      value={this.state.calcDate}
                      onChange={this.handleChange}
                      labelWidth={this.state.labelWidth}
                      inputProps={{
                        name: 'calcDate',
                        id: 'age-simple',
                      }}
                    >
                      <MenuItem value={'2014-12-01'}>12/1/2014</MenuItem>
                      <MenuItem value={'2015-12-01'}>12/1/2015</MenuItem>
                      <MenuItem value={'2016-12-01'}>12/1/2016</MenuItem>
                      <MenuItem value={'2017-12-01'}>12/1/2017</MenuItem>
                      <MenuItem value={'2018-12-01'}>12/1/2018</MenuItem>
                  
                    </Select>
                  </FormControl>
                  <Popover>
                    To calculate your estimate, please select one of the dates from the dropdown below. For example, if you wanted to estimate potential benefits from 03/01/2018, you would would select “12/01/2017” from the dropdown below. If you wanted to estimate benefits from 01/01/2019, you would select “12/01/2018” from the dropdown below.
                      <br />  
                    Click anywhere outside this box to exit this explanation.
                  </Popover>
            </Grid>

            <Grid item xs={8}></Grid>

            <Grid item xs={12}></Grid>


            <Grid container spacing = {24}>

            <Grid item sm={2} xs={12}><h4>Monthly Income<span title="Please enter each monthly income source separately for you and your dependents (if applicable). If you have more than one dependent, the estimator currently requires that you lump any dependents’ income together." data-toggle="modal" data-target="#myModal"><br></br><i class="far fa-question-circle"></i></span></h4></Grid>
                    <Hidden smDown>
                      <Grid item sm={5} xs={6}>You</Grid>
                    </Hidden>
                    <Hidden smDown>
                      <Grid item sm={5} xs={6}>Dependent(s)</Grid>
                    </Hidden>  



                    <Grid item sm={2} xs={12}></Grid>
                    <Grid item sm={5} xs={12}>
                          <FormControl className={classes.formControl} fullWidth ={true}>
                          <TextField
                            id="SSIncome"
                            label="Social Security Income"
                            value={this.state.selfSSIn}
                            onChange={this.handleChange}
                            className={classes.textField}
                            type="number"
                            InputProps={{
                              name: "selfSSIn",
                              startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                          />
                            </FormControl>
                      </Grid>
    
                    <Grid item sm={5} xs={12}>
                            <FormControl className={classes.formControl} fullWidth ={true}>
                            <TextField
                              id="depSSIncome"
                              label="Social Security Income (Dependents)"
                              // labelWidth={8000}
                              value={this.state.depSSIn}
                              onChange={this.handleChange}
                              type="number"
                              className={classes.textField}
                              InputProps ={{
                                name: 'depSSIn',
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              margin="normal"
                            />
                        </FormControl>
                    </Grid>


                    <Hidden smDown>
                      <Grid item sm={2} xs={12}></Grid>  
                    </Hidden>


                    <Grid item sm={5} xs={12}>
                            <FormControl className={classes.formControl} fullWidth ={true}>
                            <TextField
                              id="selfRetireIncome"
                              label="Retirement Income"
                              value={this.state.selfRetireIn}
                              onChange={this.handleChange}
                              type="number"
                              className={classes.textField}
                              InputProps ={{
                                name: 'selfRetireIn',
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              margin="normal"
                            />
                    </FormControl>
                      </Grid>
    
                    <Grid item sm={5} xs={12}>
                            <FormControl className={classes.formControl} fullWidth ={true}>
                          <TextField
                            id="depnRetireIncome"
                            label="Retirement Income (Dependents)"
                            value={this.state.depRetireIn}
                            onChange={this.handleChange}
                            InputProps ={{
                              name: 'depRetireIn',
                              startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                          />
                          </FormControl>
                    </Grid>     

                    <Hidden smDown>
                      <Grid item sm={2} xs={12}></Grid>
                    </Hidden>



                    <Grid item sm={5} xs={12}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherIncome1"
                      label="Other Income"
                      value={this.state.selfOtherIn1}
                      onChange={this.handleChange}
                      type="number"
                      className={classes.textField}
                      InputProps ={{
                        name: 'selfOtherIn1',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item sm={5} xs={12}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="depOtherIncome1"
                        label="Other Income (Dependents)"
                        value={this.state.depOtherIn1}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherIn1',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>
            

                    <Hidden smDown>
                      <Grid item sm={2} xs={12}></Grid>
                    </Hidden>


                    <Grid item sm={5} xs={12}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherIncome2"
                      label="Other Income 2"
                      value={this.state.selfOtherIn2}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfOtherIn2',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item sm={5} xs={12}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="depOtherIncome2"
                        label="Other Income 2 (Dependents)"
                        value={this.state.depOtherIn2}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherIn2',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                         </FormControl>
                        </Grid>
                        <Grid item xs={4}></Grid>


                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>



                    <Grid item sm={2} xs={12}><h4>Monthly Expenses<span title="Please enter each monthly medical expense source separately for you and your dependents (if applicable). If you have more than one dependent, the estimator currently requires that you lump any dependents’ medical expenses together." data-toggle="popover" data-trigger="hover"><br></br><i class="far fa-question-circle"></i></span></h4></Grid>
                    <Hidden smDown>
                      <Grid item xs={5}>You</Grid>
                    </Hidden>
                    <Hidden smDown>
                      <Grid item xs={5}>Dependent(s)</Grid>
                    </Hidden>

                    <Hidden smDown>
                      <Grid item xs={2}></Grid>
                    </Hidden>

                    <Grid item sm={5} xs={12}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfMedPartB"
                      label="Medicare Part B"
                      value={this.state.selfMedPartBEx}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfMedPartBEx',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                        fullWidth: true
                      }}
                      margin="normal"
                    />
                      </FormControl>                      
                      </Grid>

                      <Grid item sm={5} xs={12}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                      flexWrap="wrap"
                        id="depOtherIncome2"
                        label="Medicare Part B (Dependents)"
                        value={this.state.depMedPartBEx}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depMedPartBEx',
                          margin: 'normal',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                          fullWidth: true
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>

                    <Hidden smDown>
                      <Grid item xs={2}></Grid>           
                    </Hidden>

                    <Grid item sm={5} xs={12}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfPrivateMedIns"
                      label="Private Medical Insurance"
                      value={this.state.selfPrivMedIns}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfPrivMedIns',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item sm = {5} xs={12}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                      
                        id="depPrivateMedIns"
                        label="Private Medical Insurance (Dependents)"
                        value={this.state.depPrivMedIns}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depPrivMedIns',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                          margin: 'dense'
                        }}
                        margin="normal"
    
                      />
                          </FormControl>
                        </Grid>

                    <Hidden smDown>
                      <Grid item xs={2}></Grid>
                    </Hidden>

                    <Grid item sm ={5} xs={12}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherExpense1"
                      label="Other Expense 1"
                      value={this.state.selfOtherEx1}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfOtherEx1',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item sm={5} xs={12}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="selfOtherExpense1"
                        label="Other Expense 1 (Dependents)"
                        value={this.state.depOtherEx1}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherEx1',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>

                    <Hidden smDown>
                      <Grid item xs={2}></Grid>
                    </Hidden>

                    <Grid item sm={5} xs={12}> 
                    <FormControl className={classes.formControl} fullWidth ={true}>
                    <TextField
                      id="selfOtherExpense2"
                      label="Other Expense 2"
                      value={this.state.selfOtherEx2}
                      onChange={this.handleChange}
                      InputProps ={{
                        name: 'selfOtherEx2',
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                      </FormControl>
                      </Grid>

                      <Grid item sm={ 5} xs={12}>
                      <FormControl className={classes.formControl} fullWidth ={true}>
                      <TextField
                        id="selfOtherExpense2"
                        label="Other Expense 2 (Dependents)"
                        value={this.state.depOtherEx2}
                        onChange={this.handleChange}
                        InputProps ={{
                          name: 'depOtherEx2',
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                        </FormControl>
                        </Grid>

                        <Grid item sm={5} xs={4}></Grid>
                        <Grid item sm={2} xs={4}>
                          <label htmlFor="outlined-button-file">
                          <Button variant="outlined" component="span" size='medium' className={classes.button} onClick={(event) => { this.handleCalculateButton(event)}}>
                          Calculate
                          </Button>
                          </label>
                        </Grid>
                        <Grid item sm={2} xs={4}></Grid>
                        
            </Grid>

        </Grid>

        </form>
      );
    }
  }
  
  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleSelect);
