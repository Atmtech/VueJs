var ObtenirParametre = function (req, nomParametre) {
    const querystring = require('querystring');
    var parametre = req.params.parametre;
    var valeur = querystring.decode(parametre);
    return valeur[nomParametre];
}

var ObtenirAnneeSaison = function (req) { return ObtenirParametre(req, "AnneeSaison"); }
var ObtenirDateDebut = function (req) { return ObtenirParametre(req, "DateDebut"); }
var ObtenirDateFin = function (req) { return ObtenirParametre(req, "DateFin"); }
var ObtenirCourriel = function (req) { return ObtenirParametre(req, "Courriel"); }
var ObtenirGamePk = function (req) { return ObtenirParametre(req, "GamePk"); }
var ObtenirMotPasse = function (req) { return ObtenirParametre(req, "MotPasse"); }
var ObtenirPointageLocal = function (req) { return ObtenirParametre(req, "PointageLocal"); }
var ObtenirPointageVisiteur = function (req) { return ObtenirParametre(req, "PointageVisiteur"); }

module.exports = {
    ObtenirAnneeSaison: ObtenirAnneeSaison,
    ObtenirDateDebut: ObtenirDateDebut,
    ObtenirDateFin: ObtenirDateFin,
    ObtenirCourriel: ObtenirCourriel,
    ObtenirGamePk: ObtenirGamePk,
    ObtenirMotPasse:ObtenirMotPasse,
    ObtenirPointageLocal: ObtenirPointageLocal,
    ObtenirPointageVisiteur:ObtenirPointageVisiteur,

}


