// pull in the models
const db = require("../models");

// define the methods for estimatorController.js

module.exports = {
  // method that returns the appropriate rate based on year and claimant type
  createUser: function(req, res) {
    db.Users
      .create( {
        userID: req.body.userID
      })
      .then(dbResults => res.json(dbResults))
      .catch(err => res.status(422).json(err));
  }
  }