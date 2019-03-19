// THE API ROUTE TO GET THE NECESSARY RATES FOR ESTIMATION

const router = require("express").Router();
// pull in the rates controller
const estimatorController = require("../../controllers/estimatorController");

// matches with "/api/estimate"
// takes in the effective date paramater, followed by the claimant date paramater to return the correct rate information.
router.route("/:effectiveDate/:claimantType")
  // get calls the method that returns the appropriate rates for the estimator
  .get(estimatorController.findRate);

// matches with "api/estimate/store-estimate"
router.route("/store-estimate/:id")
  .post(estimatorController.storeEstimates);

// export the router
module.exports = router;