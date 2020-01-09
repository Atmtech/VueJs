export default {
    obtenirServiceEndPoint(href) {
      if (href.indexOf("localhost") >= 0) {
        return "http://localhost:20100/api"
      }
      if (href.indexOf("cuntcock") >= 0) {
        return "http://api.cuntcock.com/api"
      }
      if (href.indexOf("va-chier") >= 0) {
        return "http://api.va-chier.com/api"
      }
    }
  };
  