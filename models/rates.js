// the rates model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratesSchema = new Schema({
  // The Rate Change Effective Date
  effectiveDate: {type: String, required: true},
  // The claimantType (i.e. Veteran, Surviving Spouse, Surviving Child)
  claimantType: {type: String, required: true},
  // the base rate without any dependents
  baseRate: {type: Number, required: true},
  // housebound rate with no dependents
  hbRate: Number,
  // aid and attendance rate with no dependents
  aaRate: Number,
  // the base rate with one dependent
  baseRateAddOne: Number,
  // housebound rate with one dependent
  hbRateAddOne: Number,
  // aid and attendance rate with one dependent
  aaRateAddOne: Number,
  // the additional allowance for dependents after the add one rate
  moreDepsRate: Number
});

const Rates = mongoose.model("Rates", ratesSchema);

module.exports = Rates;

