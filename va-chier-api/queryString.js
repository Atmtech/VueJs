var ObtenirParametre = function (req, nomParametre) {
    const querystring = require('querystring');
    var parametre = req.params.parametre;
    var valeur = querystring.decode(parametre);
    return valeur[nomParametre];
}

var ObtenirNombreParPage = function (req) { return ObtenirParametre(req, "NombreParPage"); }
var ObtenirPage = function (req) { return ObtenirParametre(req, "Page"); }
var ObtenirIp = function (req) { return ObtenirParametre(req, "Ip"); }
var ObtenirTitre = function (req) { return ObtenirParametre(req, "Titre"); }
var ObtenirDescription = function (req) { return ObtenirParametre(req, "Description"); }
var ObtenirIdInsulte = function (req) { return ObtenirParametre(req, "Id"); }

module.exports = {
    ObtenirNombreParPage: ObtenirNombreParPage,
    ObtenirPage: ObtenirPage,
    ObtenirIp: ObtenirIp,
    ObtenirTitre: ObtenirTitre,
    ObtenirDescription: ObtenirDescription,
    ObtenirIdInsulte:ObtenirIdInsulte
}

