const mongoose = require("mongoose");
const db = require("../models");

// this file empties out the Rates collection and inserts the rates below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/VA-Estimator"
);

const estimates = 
  {
    applyingAs: "Veteran",
    effectiveDate: "2018-12-01",
    additionalBenefits: "None",
    dependentNumber: 0,
  }



db.Estimates
  .remove({})
  .then(() => db.Estimates.create(estimates))
  .then(data => {
    // console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });