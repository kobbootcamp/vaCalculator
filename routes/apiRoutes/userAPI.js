// THE API ROUTE TO GET THE NECESSARY USER INFORMATION

const router = require("express").Router();
// pull in the rates controller
const userController = require("../../controllers/userController");
const estimatorController = require("../../controllers/estimatorController");

// matches with "api/users"
router.route("/create")
  .post(userController.createUser);



// matches with "api/users/get-estimate"
router.route("/get-estimate/:id")
  .get(estimatorController.findEstimates);

// export the router
module.exports = router;