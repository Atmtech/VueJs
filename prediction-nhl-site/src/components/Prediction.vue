<template>
  <div
    class="card"
    v-bind:class="[couleurTexte, couleurFond]"
    style="width: 16.93rem"
  >
    <div class="card-body">
      <div class="row">
        <div class="col  text-center">
          <div
            style="background-color:white; border-radius: 50%;    width: 3em;    height: 3em; "
          >
            <img v-bind:src="'../logo/' + LogoVisiteur" style="width: 3em;" />
          </div>
        </div>
        <div class="col">
          <h6>({{ Heure }})</h6>
        </div>
        <div class="col text-center">
          <div
            style="background-color:white; border-radius: 50%;    width: 3em;    height: 3em; "
          >
            <img v-bind:src="'../logo/' + LogoLocal" style="width: 3em;" />
          </div>
        </div>
      </div>
      <div class="row text-center font-weight-bold">
        <div class="col">{{ NomVisiteur }} vs. {{ NomLocal }}</div>
      </div>
      <div class="row text-center small">
        <div class="col">
          {{ NomArena }}
        </div>
      </div>
      <div class="row text-center font-weight-bold">
        <div class="col">
          <h3>{{ PointageVisiteur }}</h3>
        </div>
        <div class="col">
          -
        </div>
        <div class="col">
          <h3>{{ PointageLocal }}</h3>
        </div>
      </div>

      <div class="row text-center font-weight-bold">
        <div class="col">
          <input
            class="form-control bg-dark text-white text-center display-4"
            v-model="PredictionVisiteur"
            style="width:50px;"
            v-on:change="save($event)"
          />
        </div>
        <div class="col">
          -
        </div>
        <div class="col">
          <input
            class="form-control bg-dark text-white text-center"
            v-model="PredictionLocal"
            style="width:50px;"
            v-on:change="save($event)"
          />
        </div>
      </div>

      <div class="row pt-2">
        <div style="font-size: 0.75em;">
          <table class="table  table-dark  table-sm" style="width:100%;">
            <tr>
              <td></td>
              <td>Pos.</td>
              <td>MJ</td>
              <td>V</td>
              <td>D</td>
              <td>BC</td>
              <td>BP</td>
              <td>PT</td>
              <td>Str.</td>
            </tr>
            <tr>
              <td>
                  <div
                  style="background-color:white; border-radius: 50%;    width: 2em;    height: 2em; "
                >
                <img
                  v-bind:src="'../logo/' + LogoVisiteur"
                  style="width: 2em;" v-bind:alt="NomVisiteur"
                />
                </div>
              </td>
              <td>{{ RangVisiteur }}</td>
              <td>{{ MatchJoueVisiteur }}</td>
              <td>{{ VictoireVisiteur }}</td>
              <td>{{ DefaiteVisiteur }}</td>
              <td>{{ ButContreVisiteur }}</td>
              <td>{{ ButProduitVisiteur }}</td>
              <td>{{ PointVisiteur }}</td>
              <td>{{ StreakVisiteur }}</td>
            </tr>
            <tr>
              <td>
                <div
                  style="background-color:white; border-radius: 50%;    width: 2em;    height: 2em; "
                >
                  <img
                    v-bind:src="'../logo/' + LogoLocal"
                    style="width: 2em;"
                  />
                </div>
              </td>
              <td>{{ RangLocal }}</td>
              <td>{{ MatchJoueLocal }}</td>
              <td>{{ VictoireLocal }}</td>
              <td>{{ DefaiteLocal }}</td>
              <td>{{ ButContreLocal }}</td>
              <td>{{ ButProduitLocal }}</td>
              <td>{{ PointLocal }}</td>
              <td>{{ StreakLocal }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
        <button
          type="submit"
          class="btn btn-primary btn-block"
          v-on:click="afficher"
        >
          LES AUTRES PRÉDICTIONS
        </button>
      </div>
      <div class="row pt-2" v-if="estAfficher">
        <div class="pl-1 pr-1" style="font-size: 0.75em;">
          <table class="table  table-dark  table-sm" style="width:100%;">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Visiteur</th>
                <th>Local</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-for="prediction in predictions"
              v-bind:key="prediction._id"
            >
              <td>
                {{
                  prediction.Utilisateur.Prenom +
                    " " +
                    prediction.Utilisateur.Nom
                }}
              </td>
              <td>{{ prediction.PointageVisiteur }}</td>
              <td>{{ prediction.PointageLocal }}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Services from "../services/services";

export default {
  props: ["Game"],
  data: function() {
    return {
      predictions: [],
      couleurTexte: "text-white",
      couleurFond: "bg-secondary",
      GamePk: "tamere",
      Heure: "19:00",
      LogoVisiteur: "anaheim.png",
      LogoLocal: "toronto.png",
      NomVisiteur: "Anaheim",
      NomLocal: "Toronto",
      PointageVisiteur: 0,
      PointageLocal: 0,
      PredictionVisiteur: 0,
      PredictionLocal: 0,
      NomArena: "Centre bell",
      RangVisiteur: "12th",
      RangLocal: "12th",
      MatchJoueVisiteur: "12",
      MatchJoueLocal: "12",
      VictoireVisiteur: "10",
      VictoireLocal: "10",
      DefaiteVisiteur: "10",
      DefaiteLocal: "10",
      ButContreVisiteur: "10",
      ButContreLocal: "10",
      ButProduitVisiteur: "10",
      ButProduitLocal: "10",
      PointVisiteur: "10",
      PointLocal: "10",
      StreakVisiteur: "10",
      StreakLocal: "10",
      estAfficher: false
    };
  },
  mounted() {
    this.GamePk = this.Game.gamePk;

    this.PointageVisiteur = this.Game.teams.away.score;
    this.PointageLocal = this.Game.teams.home.score;

    this.NomArena = this.Game.teams.home.team.venue.name;
    var dateGame = new Date(this.Game.gameDate);

    this.LogoVisiteur = this.trouverLogo(this.Game.teams.away.team.id);
    this.LogoLocal = this.trouverLogo(this.Game.teams.home.team.id);

    var minute = dateGame.getMinutes();
    if (dateGame.getMinutes() < 10) {
      minute = "0" + dateGame.getMinutes();
    }
    this.Heure = dateGame.getHours() + ":" + minute;
    this.trouverStats(this.Game.teams.away.team.id);
    this.trouverStats(this.Game.teams.home.team.id);
    this.obtenirPrediction(this.Game.gamePk);
  },
  methods: {
    afficher: function() {
      if (this.estAfficher) {
        this.estAfficher = false;
      } else {
        this.estAfficher = true;
      }
    },
    save: function() {
      if (this.PredictionVisiteur != "" && this.PredictionLocal != "") {
        Services.exec("EnregistrerPrediction", this.$store.state, {
          PredictionVisiteur: this.PredictionVisiteur,
          PredictionLocal: this.PredictionLocal,
          GamePk: this.GamePk
        });
      }
    },
    obtenirPrediction: function(gamePk) {
      Services.exec("ObtenirPrediction", this.$store.state, {
        GamePk: gamePk
      }).then(response => {
        this.PredictionVisiteur = response.data.PointageVisiteur;
        this.PredictionLocal = response.data.PointageLocal;

        var estVisiteurGagnant = false;
        var estPredictionVisiteurGagnant = false;
        if (parseInt(this.PointageVisiteur) > parseInt(this.PointageLocal)) {
          estVisiteurGagnant = true;
        }
        if (
          parseInt(this.PredictionVisiteur) > parseInt(this.PredictionLocal)
        ) {
          estPredictionVisiteurGagnant = true;
        }

        if (estVisiteurGagnant == estPredictionVisiteurGagnant) {
          this.couleurTexte = "text-black";
          this.couleurFond = "bg-success";
        }
        if (estVisiteurGagnant != estPredictionVisiteurGagnant) {
          this.couleurTexte = "text-black";
          this.couleurFond = "bg-danger";
        }

        if (this.PredictionVisiteur == null || this.PredictionLocal == null) {
          this.couleurTexte = "text-white";
          this.couleurFond = "bg-secondary";
        }
      });
      Services.exec("ObtenirToutesPrediction", this.$store.state, {
        GamePk: gamePk
      }).then(response => {
        this.predictions = response.data;
      });
    },
    trouverStats: function(equipe) {
      if (this.Game.teams.away.team.id == equipe) {
        Services.exec("ObtenirStanding", this.$store.state, {
          Equipe: this.Game.teams.away.team.id
        }).then(response => {
          response.data.forEach(element => {
            if (element.type.displayName == "statsSingleSeason") {
              this.MatchJoueVisiteur = element.splits[0].stat.gamesPlayed;
              this.VictoireVisiteur = element.splits[0].stat.wins;
              this.DefaiteVisiteur = element.splits[0].stat.losses;

              this.PointVisiteur = element.splits[0].stat.pts;
              this.StreakVisiteur = "...";
            }
            if (element.type.displayName == "regularSeasonStatRankings") {
              this.RangVisiteur = element.splits[0].stat.pts;
              this.ButContreVisiteur =
                element.splits[0].stat.goalsAgainstPerGame;
              this.ButProduitVisiteur = element.splits[0].stat.goalsPerGame;
            }
          });
        });
      } else {
        Services.exec("ObtenirStanding", this.$store.state, {
          Equipe: this.Game.teams.home.team.id
        }).then(response => {
          response.data.forEach(element => {
            if (element.type.displayName == "statsSingleSeason") {
              this.MatchJoueLocal = element.splits[0].stat.gamesPlayed;
              this.VictoireLocal = element.splits[0].stat.wins;
              this.DefaiteLocal = element.splits[0].stat.losses;

              this.PointLocal = element.splits[0].stat.pts;
              this.StreakLocal = "...";
            }
            if (element.type.displayName == "regularSeasonStatRankings") {
              this.RangLocal = element.splits[0].stat.pts;
              this.ButContreLocal = element.splits[0].stat.goalsAgainstPerGame;
              this.ButProduitLocal = element.splits[0].stat.goalsPerGame;
            }
          });
        });
      }
    },
    trouverLogo: function(equipe) {
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
  }
};
</script>
