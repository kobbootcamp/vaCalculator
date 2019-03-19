const mongoose = require("mongoose");
const db = require("../models");

// this file empties out the Rates collection and inserts the rates below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/VA-Estimator"
);

// The Rates

const ratesSeed = [

  // === VETERAN RATES ====
  {
    // 12/01/2018 RATES
    effectiveDate: "2018-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Veteran",
    // the base rate without any dependents
    baseRate: 13535,
    // housebound rate with no dependents
    hbRate: 16540,
    // aid and attendance rate with no dependents
    aaRate: 22577,
    // the base rate with one dependent
    baseRateAddOne: 17724,
    // housebound rate with one dependent
    hbRateAddOne: 20731,
    // aid and attendance rate with one dependent
    aaRateAddOne: 26766,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2313
  },

  {
    // 12/01/2017 RATES
    effectiveDate: "2017-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Veteran",
    // the base rate without any dependents
    baseRate: 13166,
    // housebound rate with no dependents
    hbRate: 16089,
    // aid and attendance rate with no dependents
    aaRate: 21962,
    // the base rate with one dependent
    baseRateAddOne: 17241,
    // housebound rate with one dependent
    hbRateAddOne: 20166,
    // aid and attendance rate with one dependent
    aaRateAddOne: 26036,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2250
  },

  {
    // 12/01/2016 RATES
    effectiveDate: "2016-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Veteran",
    // the base rate without any dependents
    baseRate: 12907,
    // housebound rate with no dependents
    hbRate: 15773,
    // aid and attendance rate with no dependents
    aaRate: 21531,
    // the base rate with one dependent
    baseRateAddOne: 16902,
    // housebound rate with one dependent
    hbRateAddOne: 19770,
    // aid and attendance rate with one dependent
    aaRateAddOne: 25525,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2205
  },

  {
    // 12/01/2015 RATES (Same as 12/01/2014, no COLA)
    effectiveDate: "2015-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Veteran",
    // the base rate without any dependents
    baseRate: 12868,
    // housebound rate with no dependents
    hbRate: 15725,
    // aid and attendance rate with no dependents
    aaRate: 21466,
    // the base rate with one dependent
    baseRateAddOne: 16851,
    // housebound rate with one dependent
    hbRateAddOne: 19710,
    // aid and attendance rate with one dependent
    aaRateAddOne: 25448,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2198
  },

  {
    // 12/01/2014 RATES 
    effectiveDate: "2014-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Veteran",
    // the base rate without any dependents
    baseRate: 12868,
    // housebound rate with no dependents
    hbRate: 15725,
    // aid and attendance rate with no dependents
    aaRate: 21466,
    // the base rate with one dependent
    baseRateAddOne: 16851,
    // housebound rate with one dependent
    hbRateAddOne: 19710,
    // aid and attendance rate with one dependent
    aaRateAddOne: 25448,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2198
  },

  // === SURVIVNG SPOUSE RATES ====
  {
    // 12/01/2018 RATES
    effectiveDate: "2018-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Spouse",
    // the base rate without any dependents
    baseRate: 9078,
    // housebound rate with no dependents
    hbRate: 11095,
    // aid and attendance rate with no dependents
    aaRate: 14509,
    // the base rate with one dependent
    baseRateAddOne: 11881,
    // housebound rate with one dependent
    hbRateAddOne: 13893,
    // aid and attendance rate with one dependent
    aaRateAddOne: 17309,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2313
  },

  {
    // 12/01/2017 RATES
    effectiveDate: "2017-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Spouse",
    // the base rate without any dependents
    baseRate: 8830,
    // housebound rate with no dependents
    hbRate: 10792,
    // aid and attendance rate with no dependents
    aaRate: 14113,
    // the base rate with one dependent
    baseRateAddOne: 11557,
    // housebound rate with one dependent
    hbRateAddOne: 13514,
    // aid and attendance rate with one dependent
    aaRateAddOne: 16837,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2250
  },

  {
    // 12/01/2016 RATES
    effectiveDate: "2016-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Spouse",
    // the base rate without any dependents
    baseRate: 8656,
    // housebound rate with no dependents
    hbRate: 10580,
    // aid and attendance rate with no dependents
    aaRate: 13836,
    // the base rate with one dependent
    baseRateAddOne: 11330,
    // housebound rate with one dependent
    hbRateAddOne: 13249,
    // aid and attendance rate with one dependent
    aaRateAddOne: 16506,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2205
  },

  {
    // 12/01/2015 RATES (Same as 12/01/2014, no COLA)
    effectiveDate: "2015-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Spouse",
    // the base rate without any dependents
    baseRate: 8630,
    // housebound rate with no dependents
    hbRate: 10548,
    // aid and attendance rate with no dependents
    aaRate: 13794,
    // the base rate with one dependent
    baseRateAddOne: 11296,
    // housebound rate with one dependent
    hbRateAddOne: 13209,
    // aid and attendance rate with one dependent
    aaRateAddOne: 16456,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2198
  },

  {
    // 12/01/2014 RATES 
    effectiveDate: "2014-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Spouse",
    // the base rate without any dependents
    baseRate: 8630,
    // housebound rate with no dependents
    hbRate: 10548,
    // aid and attendance rate with no dependents
    aaRate: 13794,
    // the base rate with one dependent
    baseRateAddOne: 11296,
    // housebound rate with one dependent
    hbRateAddOne: 13209,
    // aid and attendance rate with one dependent
    aaRateAddOne: 16456,
    // the additional allowance for dependents after the add one rate
    moreDepsRate: 2198
  },

  // === SURVIVNG CHILD ALONE RATES ====
  {
    // 12/01/2018 RATES
    effectiveDate: "2018-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Child",
    // the base rate without any dependents
    baseRate: 2313,
    // !NOT ELIGIBLE FOR ADDITIONAL ALLOWANCES
  },

  {
    // 12/01/2017 RATES
    effectiveDate: "2017-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Child",
    // the base rate without any dependents
    baseRate: 2250,
    // !NOT ELIGIBLE FOR ADDITIONAL ALLOWANCES
  },

  {
    // 12/01/2016 RATES
    effectiveDate: "2016-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Child",
    // the base rate without any dependents
    baseRate: 2205,
    // !NOT ELIGIBLE FOR ADDITIONAL ALLOWANCES
  },

  {
    // 12/01/2015 RATES (Same as 12/01/2014, no COLA)
    effectiveDate: "2015-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Child",
    // the base rate without any dependents
    baseRate: 2198,
    // !NOT ELIGIBLE FOR ADDITIONAL ALLOWANCES
  },

  {
    // 12/01/2014 RATES 
    effectiveDate: "2014-12-01",
    // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
    claimantType: "Surviving Child",
    // the base rate without any dependents
    baseRate: 2198,
    // !NOT ELIGIBLE FOR ADDITIONAL ALLOWANCES
  }


]


db.Rates
  .remove({})
  .then(() => db.Rates.collection.insertMany(ratesSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });