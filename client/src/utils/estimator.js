
const estimator = {
  // method that takes in the baseMedRate, calculates the medical expense deduction.
  calcMedDed: function (baseMedRate) {
    // the medical expense deduction is 5% of the baserate, rounded down to the nearest dollar.
    let medicalDeduction = parseInt(baseMedRate) * .05;
    // rounds it down to the nearest whole dollar and returns the value.
    return medicalDeduction = parseInt(medicalDeduction);
  },

  // method that takes in a single monthly income and annualizes it
  calcAnnSingInc: function(monthlyAmount) {
    // mutiplies the monthly income by 12 to annualize it
    let annualAmt = parseFloat(monthlyAmount) * 12;
    // returns it rounded down to the nearest whole dollar
    return annualAmt = parseInt(annualAmt);
  },

  // method that takes in a single monthly medical expense and annualizes it.
  calcAnnSingExp: function (monthlyAmount) {
    // multiplies the monthly expense by 12 to annualize it. NOTE: Medical expenses DO NOT get rounded down to the nearest dollar at this stage.
    let annualAmt = parseFloat(monthlyAmount) * 12;
    // round down to two decimal places and return the value
    return annualAmt = Math.round(annualAmt * 100) / 100;
  },

  // method that calculates the total income from an array of monthly income amounts
  totalIncome: function(array) {
    let temp = 0;
    for (let i = 0; i < array.length; i++) {
      temp = temp + estimator.calcAnnSingInc(array[i])
    }
    return temp;
  },
  
  // method that calculates the total medical expenses from an array of monthly medical expense amounts
  totalMeds: function(array) {
    let temp = 0;
    for (let i = 0; i < array.length; i++) {
      temp = temp + estimator.calcAnnSingExp(array[i])
    }
    // round it down to the nearest dollar here
    return parseInt(temp);
  },

  // method that calculates the income for VA purposes, takes in an array of monthly income values; an array of medical expense values, the baseMedRate, and the appropriate baserate.
  IVAP: function (incomeArray, expensesArray, baseMedRate) {
    let totalMeds = estimator.totalMeds(expensesArray);
    // if total meds don't exceed the the deductible, it doesn't help the claimant so totalMeds effectively 0
    if (totalMeds <= estimator.calcMedDed(baseMedRate)) {
      totalMeds = 0;
    } else {
      totalMeds = totalMeds - estimator.calcMedDed(baseMedRate);
    };
    

    // determine total income
    let totalIncome = estimator.totalIncome(incomeArray)
    

    let IVAP = totalIncome - totalMeds;
    // income for VA purposes cannot be negative so it will return zero; otherwise return the correct IVAP
    if (IVAP < 0) {
      return 0
    } else {
      return IVAP;
    }
  },
  // method that determines the monthly pension rate
  monthlyRate: function (incomeArray, expensesArray, baseRate, baseMedRate) {
    // if the IVAP is greater or equal to the baseRate, they won't get anything
    if (estimator.IVAP(incomeArray, expensesArray, baseMedRate) >= baseRate) {
      return 0;
    } else {
      // caclulate the annual rate
      let annualRate = baseRate - estimator.IVAP(incomeArray, expensesArray, baseMedRate)
      // divide the annual benefit rate by 12 and round down to nearest whole dollar
      let monthlyRate = parseInt(annualRate / 12);
      // return the value
      return monthlyRate;
    }
  }
}

module.exports = estimator;

