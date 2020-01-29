var mongoose = require("mongoose");
Schema = mongoose.Schema;

var queryString = require("../queryString");
const axios = require("axios");
var Prediction = require("../schema/factory.js").PredictionFactory();
var Utilisateur = require("../schema/factory.js").UtilisateurFactory();
var Classement = require("../schema/classement");

function trouverGame(listeGame, gamePk) {
  var retour;
  listeGame.forEach(element => {
    element.games.forEach(game => {
      if (parseInt(game.gamePk) == parseInt(gamePk)) {
        retour = game;
        return;
      }
    });
  });
  return retour;
}

exports.ObtenirStanding = function(req, res) {
  var idEquipe = queryString.ObtenirEquipe(req);
  var url = "https://statsapi.web.nhl.com/api/v1/teams/" + idEquipe + "/stats";
  axios.get(url).then(function(response) {
    res.send(response.data.stats);
  });
};

exports.ObtenirListeDatePrediction = function(req, res) {
  var start = new Date("10/01/2019");
  var end = new Date("04/04/2020");

  var daysOfYear = [];
  var loop = new Date(start);

  while (loop <= end) {
    var newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    if (loop.getDay() == 6) {
      var dd = loop.getDate();

      var mm = loop.getMonth() + 1;
      var yyyy = loop.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      dateAjouter = yyyy + "-" + mm + "-" + dd;
      daysOfYear.push(dateAjouter);
    }
  }

  res.send(daysOfYear);
};

exports.ObtenirGame = function(req, res) {
  var dateDebut = queryString.ObtenirDateDebut(req);
  var url =
    "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" +
    dateDebut +
    "&endDate=" +
    dateDebut +
    "&expand=schedule.teams";

  axios.get(url).then(function(response) {
    var listeNhl = response.data.dates;
    var games = listeNhl[0].games;
    var retour = [];
    games.forEach(element => {
      var dateGameOfficielle = element.gameDate.substring(
        0,
        element.gameDate.indexOf("T")
      );
      if (dateGameOfficielle == dateDebut) {
        retour.push(element);
      }
    });
    res.send(retour);
  });
};
exports.ObtenirPrediction = function(req, res) {
  var courriel = queryString.ObtenirCourriel(req);
  var gamePk = queryString.ObtenirGamePk(req);
  Prediction.find({ "Utilisateur.Courriel": courriel }).exec(function(
    err,
    docs
  ) {
    var prediction = docs.find(x => x.GamePrimaryKey == gamePk);
    res.send(prediction);
  });
};

exports.ObtenirToutesPrediction = function(req, res) {
  var gamePk = queryString.ObtenirGamePk(req);
  
  Prediction.find().exec(function(err, docs) {
    var tableau = [];
    docs.forEach(element => {
      if (element.GamePrimaryKey == gamePk) {
        tableau.push(element);
      }
    });
    res.send(tableau);
  });
};

exports.EnregistrerPrediction = function(req, res) {
  var gamePk = queryString.ObtenirGamePk(req);
  var courriel = queryString.ObtenirCourriel(req);
  var predictionLocal = queryString.ObtenirPredictionLocal(req);
  var predictionVisiteur = queryString.ObtenirPredictionVisiteur(req);

  if (predictionLocal != predictionVisiteur) {
    Prediction.find({ "Utilisateur.Courriel": courriel }).exec(function(
      err,
      docs
    ) {
      var prediction = docs.find(x => x.GamePrimaryKey == gamePk);
      if (prediction != null) {
        //   console.log("Exists", "");
        prediction.PointageLocal = predictionLocal;
        prediction.PointageVisiteur = predictionVisiteur;
        prediction.save(function(err, book) {
          if (err) return console.error(err);
        });
      } else {
        //  console.log("Not Exists", "");
        Utilisateur.find({ Courriel: courriel }).exec(function(err, docs) {
          const prediction = new Prediction({
            GamePrimaryKey: gamePk,
            PointageLocal: predictionLocal,
            Utilisateur: {
              _id: docs[0]._id,
              Nom: docs[0].Nom,
              Prenom: docs[0].Prenom,
              Courriel: docs[0].Courriel,
              MotPasse: docs[0].MotPasse,
              EstAdministrateur: docs[0].EstAdministrateur
            },
            PointageVisiteur: predictionVisiteur
          });
          prediction.save(function(err, book) {
            if (err) return console.error(err);
          });
        });
      }
    });
  }

  res.send(
    gamePk +
      " :: " +
      courriel +
      " :: " +
      predictionVisiteur +
      " :: " +
      predictionLocal
  );
};

exports.ObtenirClassement = function(req, res) {
  var dateDebut = queryString.ObtenirDateDebut(req);
  var url =
    "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" +
    dateDebut +
    "&endDate=" +
    new Date().toLocaleDateString("en-US") +
    "&expand=schedule.teams";
  axios.get(url).then(function(response) {
    var listeNhl = response.data.dates;

    Prediction.find({}).exec(function(err, docs) {
      var retour = [];
      for (let index = 0; index < docs.length; index++) {
        var game = trouverGame(listeNhl, docs[index].GamePrimaryKey);

        if (game != null) {
          var estPredictionVisiteurGagnant = false;
          if (docs[index].PointageVisiteur > docs[index].PointageLocal)
            estPredictionVisiteurGagnant = true;
          if (game.teams.away.score != game.teams.home.score) {
            var estVisiteurGagnant = false;
            if (game.teams.away.score > game.teams.home.score)
              estVisiteurGagnant = true;

            var ok = retour.find(
              x => x.courriel === docs[index].Utilisateur.Courriel
            );
            if (ok != null) {
              if (estVisiteurGagnant == estPredictionVisiteurGagnant) {
                ok.pointage += 2;
                if (
                  game.teams.away.score == docs[index].PointageVisiteur &&
                  game.teams.home.score == docs[index].PointageLocal
                ) {
                  ok.pointage += 1;
                  ok.nombrePointageCorrect += 1;
                }
                ok.nombreVictoire += 1;
              } else {
                ok.nombreEchec += 1;
              }
              ok.nombreTotalPrediction += 1;
            } else {
              let classement = new Classement({
                courriel: docs[index].Utilisateur.Courriel,
                nom: docs[index].Utilisateur.Nom,
                prenom: docs[index].Utilisateur.Prenom,
                pointage: 0,
                nombrePointageCorrect: 0,
                nombreVictoire: 0,
                nombreEchec: 0,
                nombreTotalPrediction: 0
              });

              if (estVisiteurGagnant == estPredictionVisiteurGagnant) {
                classement.pointage += 2;
                if (
                  game.teams.away.score == docs[index].PointageVisiteur &&
                  game.teams.home.score == docs[index].PointageLocal
                ) {
                  classement.pointage += 1;
                  classement.nombrePointageCorrect += 1;
                }
                classement.nombreVictoire += 1;
              } else {
                classement.nombreEchec += 1;
              }
              classement.nombreTotalPrediction += 1;

              retour.push(classement);
            }
          }
        }
      }

      res.send(retour);
    });
  });
};
