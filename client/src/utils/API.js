import axios from "axios";


export default {
  // the function that retrieves the rates from the server
  getRates: function(effectiveDate, claimantType) {
    return axios.get("/api/estimate/" + effectiveDate + "/" + claimantType)
  },

  // function that POSTS the survey/?rre responses to the server
  postSurveyData: function(address, surveyData) {
    return axios.post("api/estimate/store-estimate/" + address + "", surveyData)
  },

  createUser: function(userData) {
    return axios.post("api/users/create", userData)
  },

  getEstimates: function(userID) {
    return axios.get("api/users/get-estimate/" + userID)
  }
}

