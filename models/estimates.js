// the estimates model, the schema for the collections that will be created each time the user hits calculate
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// not convinced my default values do anything.

const estimatesSchema = new Schema({
  // saves what the user is applying as
  applyingAs: {
    type: String,
    required: true
  },

  // Saves additional beneifts selection
  additionalBenefits: {
    type: String,
    default: "None"
  },

  // Saves number of dependents
  dependentNumber: {
    type: Number,
    default: 0,
    min: 0
  },

  // Saves effective date
  effectiveDate: {
    type: String,
    required: true
  },

  // Saves YOU income
  youSSA: {
    type: Number,
    default: 0,
    min: 0
  },

  youRtmt: {
    type: Number,
    default: 0,
    min: 0
  },

  youOthInc1: {
    type: Number,
    default: 0,
    min: 0
  },

  youOthInc2: {
    type: Number,
    default: 0,
    min: 0
  },

  // Saves DEPENDENT(S) income
  depSSA: {
    type: Number,
    default: 0,
    min: 0
  },

  depRtmt: {
    type: Number,
    default: 0,
    min: 0
  },

  depOthInc1: {
    type: Number,
    default: 0,
    min: 0
  },

  depOthInc2: {
    type: Number,
    default: 0,
    min: 0
  },

  // Saves YOU medical expenses
  youMedB: {
    type: Number,
    default: 0,
    min: 0
  },

  youPMI: {
    type: Number,
    default: 0,
    min: 0
  },

  youOthExp1: {
    type: Number,
    default: 0,
    min: 0
  },

  youOthExp2: {
    type: Number,
    default: 0,
    min: 0
  },

  // saves DEPENDENT(S) medical expenses
  depMedB: {
    type: Number,
    default: 0,
    min: 0
  },

  depPMI: {
    type: Number,
    default: 0,
    min: 0
  },

  depOthExp1: {
    type: Number,
    default: 0,
    min: 0
  },

  depOthExp2: {
    type: Number,
    default: 0,
    min: 0
  },

  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Estimates = mongoose.model("Estimates", estimatesSchema);

module.exports = Estimates;