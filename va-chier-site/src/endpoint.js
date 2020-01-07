export default {
    obtenirServiceEndPoint(href) {
      var temp = "";
      
      if (href.indexOf("localhost") >= 0) {
        temp = "http://localhost:20100";
      } else {
          if (href.indexOf("-chier") >= 0) {
              temp = "https://api.va-chier.com"
          }
      }
      return temp + "/api";
    }
  };
  