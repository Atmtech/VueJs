export default {
    obtenirServiceEndPoint(href) {
      if (href.indexOf("localhost") >= 0) {
        return "http://localhost:8080/api"
      }
      if (href.indexOf("etouelle") >= 0) {
        return "http://api-predictionnhl.etouelle.com/api"
      }
    }
  };
  