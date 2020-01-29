var Utilisateur = require("../schema/factory.js").UtilisateurFactory();
var queryString = require("../queryString");

exports.Authentification = function(req, res) {
  var courriel = queryString.ObtenirCourriel(req);
  var motPasse = queryString.ObtenirMotPasse(req);

  Utilisateur.find({ Courriel: courriel, MotPasse: motPasse }).exec(function(
    err,
    docs
  ) {
    var retour = false;
    if (docs.length != 0) {
      retour = true;
    }
    res.send(retour);
  });
};
