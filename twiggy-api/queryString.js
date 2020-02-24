var ObtenirParametre = function(req, nomParametre) {
  const querystring = require("querystring");
  var parametre = req.params.parametre;
  var valeur = querystring.decode(parametre);
  return valeur[nomParametre];
};

// var ObtenirNoIndividu = function(req) {
//   return ObtenirParametre(req, "NoIndividu");
// };
// var ObtenirIdPeriodeReference = function(req) {
//   return ObtenirParametre(req, "IdPeriodeReference");
// };
// var ObtenirNoIndividuGestionnaire = function(req) {
//   return ObtenirParametre(req, "NoIndividuGestionnaire");
// };

// var ObtenirCodeCategorieEmploi = function(req) {
//   return ObtenirParametre(req, "CodeCategorieEmploi");
// };
// var ObtenirIdAttente = function(req) {
//   return ObtenirParametre(req, "IdAttente");
// };

module.exports = {
  // ObtenirIdAttente: ObtenirIdAttente,
  // ObtenirNoIndividu: ObtenirNoIndividu,
  // ObtenirIdPeriodeReference: ObtenirIdPeriodeReference,
  // ObtenirNoIndividuGestionnaire: ObtenirNoIndividuGestionnaire,
  // ObtenirCodeCategorieEmploi: ObtenirCodeCategorieEmploi
};
