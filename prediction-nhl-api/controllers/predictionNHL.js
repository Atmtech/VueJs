var mongoose = require("mongoose");
Schema = mongoose.Schema;

var queryString = require("../queryString");
const axios = require("axios");
var Prediction = require("../schema/factory.js").PredictionFactory();
var Utilisateur = require("../schema/factory.js").UtilisateurFactory();
var Classement = require("../schema/classement");

var MatchPrediction = require("../schema/matchprediction");
var Equipe = require("../schema/equipe");

function TrouverGame(listeGame, gamePk) {
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

function TrouverStanding(standing, id) {
  var retour = null;
  standing[0].teamRecords.forEach(element => {
    if (element.team.id == id) {
      retour = element;
    }
  });

  standing[1].teamRecords.forEach(element => {
    if (element.team.id == id) {
      retour = element;
    }
  });

  standing[2].teamRecords.forEach(element => {
    if (element.team.id == id) {
      retour = element;
    }
  });

  standing[3].teamRecords.forEach(element => {
    if (element.team.id == id) {
      retour = element;
    }
  });
  return retour;
}

function TrouverLogo(equipe) {
  var image = "";
  if (equipe == "1") image = "newjersey.png";
  if (equipe == "2") image = "islanders.png";
  if (equipe == "3") image = "rangers.png";
  if (equipe == "4") image = "philadelphia.png";
  if (equipe == "5") image = "pittsburgh.png";
  if (equipe == "6") image = "boston.png";
  if (equipe == "7") image = "buffalo.png";
  if (equipe == "8") image = "montreal.png";
  if (equipe == "9") image = "ottawa.png";
  if (equipe == "10") image = "toronto.png";
  if (equipe == "11") image = "???.png";
  if (equipe == "12") image = "carolina.png";
  if (equipe == "13") image = "florida.png";
  if (equipe == "14") image = "tampabay.png";
  if (equipe == "15") image = "washington.png";
  if (equipe == "16") image = "chicago.png";
  if (equipe == "17") image = "detroit.png";
  if (equipe == "18") image = "nashville.png";
  if (equipe == "19") image = "stlouis.png";
  if (equipe == "20") image = "calgary.png";
  if (equipe == "21") image = "colorado.png";
  if (equipe == "22") image = "edmonton.png";
  if (equipe == "23") image = "vancouver.png";
  if (equipe == "24") image = "anaheim.png";
  if (equipe == "25") image = "dallas.png";
  if (equipe == "26") image = "losangeles.png";
  if (equipe == "27") image = "arizona.png";
  if (equipe == "28") image = "sanjose.png";
  if (equipe == "29") image = "columbus.png";
  if (equipe == "30") image = "minnesota.png";
  if (equipe == "53") image = "arizona.png";
  if (equipe == "52") image = "winnipeg.png";
  if (equipe == "54") image = "vegas.png";
  return image;
}

function EstPredictionExacte(prediction, pointageVisiteur, pointageLocal) {
  var retour = false;
  if (prediction != null) {
    if (
      prediction.PointageVisiteur == pointageVisiteur &&
      prediction.PointageLocal == pointageLocal
    ) {
      retour = true;
    } else {
      retour = false;
    }
  }
  return retour;
}
function EstPredictionGagnante(prediction, pointageVisiteur, pointageLocal) {
  var estVisiteurGagnant = false;
  var estPredictionVisiteurGagnant = false;
  var retour = false;
  if (prediction != null) {
    if (parseInt(pointageVisiteur) > parseInt(pointageLocal)) {
      estVisiteurGagnant = true;
    }
    if (
      parseInt(prediction.PointageVisiteur) > parseInt(prediction.PointageLocal)
    ) {
      estPredictionVisiteurGagnant = true;
    }
    if (estVisiteurGagnant == estPredictionVisiteurGagnant) {
      retour = true;
    } else {
      retour = false;
    }
    return retour;
  }
}
function TrouverHeure(element) {
  var dateGame = new Date(element.gameDate);
  var minute = dateGame.getMinutes();
  if (dateGame.getMinutes() < 10) {
    minute = "0" + dateGame.getMinutes();
  }
  return dateGame.getHours() + ":" + minute;
}

exports.ObtenirListePrediction = function(req, res) {
  var dateDebut = queryString.ObtenirDateDebut(req);
  var courriel = queryString.ObtenirCourriel(req);

  var tableau = [];
  var url = "https://statsapi.web.nhl.com/api/v1/schedule?date=" + dateDebut;

  axios
    .get("https://statsapi.web.nhl.com/api/v1/standings")
    .then(function(response) {
      var standing = response.data.records;
      axios.get(url).then(function(response) {
        if (response.data.dates[0] != null) {
          var listeMatch = response.data.dates[0].games;
          var listeGamePk = [];
          listeMatch.forEach(element => {
            listeGamePk.push(element.gamePk.toString());
          });
          Prediction.find(
            {
              GamePrimaryKey: { $in: listeGamePk }
            },
            function(err, listePrediction) {
              listeMatch.forEach(element => {
                var standingVisiteur = TrouverStanding(
                  standing,
                  element.teams.away.team.id
                );
                var standingLocal = TrouverStanding(
                  standing,
                  element.teams.home.team.id
                );
                
                let equipeVisiteur = new Equipe({
                  id: element.teams.away.team.id,
                  nom: element.teams.away.team.name,
                  gagne: standingVisiteur.leagueRecord.wins,
                  perdu: standingVisiteur.leagueRecord.losses,
                  points: standingVisiteur.points,
                  position: standingVisiteur.leagueRank,
                  matchJoue: standingVisiteur.gamesPlayed,
                  streak: standingVisiteur.streak.streakCode,
                  butCompte: standingVisiteur.goalsScored,
                  butContre: standingVisiteur.goalsAgainst,
                  logo: TrouverLogo(element.teams.away.team.id),
                  
                });
                let equipeLocal = new Equipe({
                  id: element.teams.home.team.id,
                  nom: element.teams.home.team.name,
                  gagne: standingLocal.leagueRecord.wins,
                  perdu: standingLocal.leagueRecord.losses,
                  points: standingLocal.points,
                  position: standingLocal.leagueRank,
                  matchJoue: standingLocal.gamesPlayed,
                  streak: standingLocal.streak.streakCode,
                  butCompte: standingLocal.goalsScored,
                  butContre: standingLocal.goalsAgainst,
                  logo: TrouverLogo(element.teams.home.team.id)
                });

                var predictionMatchUtilisateur = listePrediction.find(
                  x =>
                    x.Utilisateur.Courriel == courriel &&
                    x.GamePrimaryKey == element.gamePk
                );

                var utilisateur = null;
                if (predictionMatchUtilisateur != null) {
                  if (predictionMatchUtilisateur.Utilisateur != null) {
                    utilisateur = predictionMatchUtilisateur.Utilisateur;
                  }
                }

                var autrePrediction = listePrediction.filter(
                  x => x.GamePrimaryKey == element.gamePk
                );

                let match = new MatchPrediction({
                  utilisateur: utilisateur,
                  gamePk: element.gamePk,
                  equipeVisiteur: equipeVisiteur,
                  equipeLocal: equipeLocal,
                  pointageVisiteur: element.teams.away.score,
                  pointageLocal: element.teams.home.score,
                  pointagePredictionVisiteur:
                    predictionMatchUtilisateur != null
                      ? predictionMatchUtilisateur.PointageVisiteur
                      : "",

                  pointagePredictionLocal:
                    predictionMatchUtilisateur != null
                      ? predictionMatchUtilisateur.PointageLocal
                      : "",
                  autrePrediction: autrePrediction,
                  arena: element.venue.name,
                  estPossiblePrediction: element.status.codedGameState == "1",
                  estMatchTermine: element.status.codedGameState == "7"
                });

                match.estPredictionGagnante = EstPredictionGagnante(
                  predictionMatchUtilisateur,
                  element.teams.away.score,
                  element.teams.home.score
                );

                match.estPointagePredictionExacte = EstPredictionExacte(
                  predictionMatchUtilisateur,
                  element.teams.away.score,
                  element.teams.home.score
                );

                match.heure = TrouverHeure(element);
                tableau.push(match);
              });
              res.send(tableau);
            }
          );
        }
        //res.send(tableau)
      });
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
      if (dateAjouter != "2020-01-25")
        daysOfYear.push(dateAjouter);
    }
  }

  res.send(daysOfYear);
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
        var game = TrouverGame(listeNhl, docs[index].GamePrimaryKey);

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
