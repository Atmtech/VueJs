var api = "http://localhost:8080/api";

if (location.href.indexOf("etouelle") >= 0) {
  api = "http://api-twiggy.etouelle.com/api";
}

module.exports = { api };
