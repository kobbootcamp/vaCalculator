// pull in the models
const db = require("../models");

// define the methods for estimatorController.js

module.exports = {
  // method that returns the appropriate rate based on year and claimant type
  findRate: function(req, res) {
    db.Rates
      .find( {
        effectiveDate: req.params.effectiveDate, 
        claimantType: req.params.claimantType
      } )
      .then(dbResults => res.json(dbResults))
      .catch(err => res.status(422).json(err));
  },

  // method that stores the figures from the ?rre when the user hits calculate
  storeEstimates: function(req, res) {
    db.Estimates
      .create(req.body)
      .then(function(dbEstimates) {
        return db.Users.findOneAndUpdate( 
          { userID: req.params.id },
          { estimates: dbEstimates._id },
          { new: true } 
          )
      })
      .then(dbResults => res.json(dbResults))
      .catch(err => res.status(422).json(err));
  },

  // method that grabs prior responses from survey/?rre
  findEstimates: function(req, res) {
    db.Users
      .findOne( {userID: req.params.id} )
      .populate("estimates")
      .then(function(dbUser) {
        // If all Users are successfully found, send them back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
}
}
