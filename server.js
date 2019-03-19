const express = require("express");
const path = require("path");
// this will need to be process.env.port || 3000 once we get ready to deploy to get the API routes. Usually 3001
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
// pull in the estimator route
const estimatorRoute = require("./routes/apiRoutes/estimatorAPI");
// pull is the users route
const usersRoute = require("./routes/apiRoutes/userAPI");



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define routes here
// the Estimator API route
app.use("/api/estimate", estimatorRoute);
// the Users API route
app.use("/api/users", usersRoute);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/VA-Estimator", {useNewUrlParser: true});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
  
});
