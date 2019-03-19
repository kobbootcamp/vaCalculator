
const baseRate = {
  // take in the number of dependents; housebound or aa election (or none); and the rates object and determines the appropriate maximimum annual pension rate (MAPR)
  calculateMAPR: function (claimantType, dependents, hbaa, rates) {

    // if the claimant is either a Veteran or Surviving Spouse (so not a Surviving Child)
    if (claimantType === "Veteran" || claimantType === "Surviving Spouse") {

      // if no dependents, these are the three rates
      if (dependents === 0) {
        if (hbaa === "None") {
          return rates.baseRate;
        } else if (hbaa === "Housebound") {
          return rates.hbRate;
        } else if (hbaa === "Aid and Attendance") {
          return rates.aaRate;
        }

        // if one dependent, these are the three rates 
      } else if (dependents === 1) {
        if (hbaa === "None") {
          return rates.baseRateAddOne;
        } else if (hbaa === "Housebound") {
          return rates.hbRateAddOne;
        } else if (hbaa === "Aid and Attendance") {
          return rates.aaRateAddOne;
        }

        // if more than one dependent, these are the three rates
      } else if (dependents > 1) {
        // setting up modDeps that will determine the more additional allowance after 1 dependent
        let modDeps = dependents - 1;
        modDeps = modDeps * rates.moreDepsRate
        // the three rates after one dependent
        if (hbaa === "None") {
          return modDeps + rates.baseRateAddOne;
        } else if (hbaa === "Housebound") {
          return modDeps + rates.hbRateAddOne;
        } else if (hbaa === "Aid and Attendance") {
          return modDeps + rates.aaRateAddOne;
        }
      }

      // Surviving Child rate
    } else if (claimantType === "Surviving Child") {
      // Sole surviving children don't get additional allowance for dependents or for HB/AA
      return rates.baseRate;

      // if it's not one of the above, something has gone wrong
    } else {
      return "ERROR";
    }
  },

  // the method that determines the base rate for the medical expenses. Essentially baseRate/baseRateAddOne + any additional dependents (so no AA or HB additions)
  baseRateforMeds: function (claimantType, dependents, rates) {
    if (claimantType === "Veteran" || claimantType === "Surviving Spouse") {
      if (dependents === 0) {
        return rates.baseRate;
      } else if (dependents === 1) {
        return rates.baseRateAddOne;
      } else if (dependents > 1) {
        let modDeps = dependents - 1;
        modDeps = modDeps * rates.moreDepsRate;
        return modDeps + rates.baseRateAddOne;
      } else return "Error";
    } else if (claimantType === "Surviving Child") {
      // let temp = dependents;
      // temp = 0;
      return rates.baseRate;
    } else return "Error";
  }
}

module.exports = baseRate;
