exports.Test = function(req, res) {
  const axios = require("axios");

  axios
    .get("https://ipapi.co/142.213.15.65/json/")
    .then(function(response) {
      // handle success
      console.log(response.data.city);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      res.send("ok")
    });
};
