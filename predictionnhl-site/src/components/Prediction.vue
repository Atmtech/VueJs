<template>
  <div class="card bg-dark text-white" style="width: 16.93rem">
    <div class="card-body">
      <h6 class="card-title text-center">
        {{ NomVisiteur }} @ {{ NomLocal }} ({{ Heure }}) <br />{{ NomArena }}
      </h6>

      <table style="width:100%" class="text-center">
        <tr>
          <td>
            <h3>{{ PointageVisiteur }}</h3>
          </td>
          <td>
            <img v-bind:src="'../logo/' + LogoVisiteur" style="width: 3em;" />
          </td>
          <td>@</td>
          <td>
            <img v-bind:src="'../logo/' + LogoLocal" style="width: 3em;" />
          </td>
          <td>
            <h3>{{ PointageLocal }}</h3>
          </td>
        </tr>
      </table>

      <div class="row">
        <div class="col-6">
          <!-- :readonly="cat_id >= 1" -->
          <input
            class="form-control  bg-dark text-white text-center"
            v-model="PredictionVisiteur"
          />
        </div>
        <div class="col-6">
          <input
            class="form-control  bg-dark text-white text-center"
            v-model="PredictionLocal"
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
                <img
                  v-bind:src="'../logo/' + LogoVisiteur"
                  style="width: 2em;"
                />
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
                <img v-bind:src="'../logo/' + LogoLocal" style="width: 2em;" />
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
        <button type="submit" class="btn btn-primary btn-block">
          LES AUTRES PRÉDICTIONS
        </button>
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
      GamePk: "tamere",
      Heure: "19:00",
      LogoVisiteur: "anaheim.png",
      LogoLocal: "toronto.png",
      NomVisiteur: "Anaheim",
      NomLocal: "Toronto",
      PointageVisiteur: 3,
      PointageLocal: 5,
      PredictionVisiteur: 0,
      PredictionLocal: 1,
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
      StreakLocal: "10"
    };
  },
  mounted() {

      // eslint-disable-next-line no-console
      console.log(this.Game.gameDate);

    // this.GamePk = this.Game.gamePk;
    // this.PointageVisiteur = this.Game.teams.away.score;
    // this.PointageLocal = this.Game.teams.home.score;
    // this.NomArena = this.Game.teams.home.team.venue.name;
    // var dateGame = new Date(this.Game.gameDate);

    // this.LogoVisiteur = this.trouverLogo(this.Game.teams.away.team.id);
    // this.LogoLocal = this.trouverLogo(this.Game.teams.home.team.id);

    // var minute = dateGame.getMinutes();
    // if (dateGame.getMinutes() < 10) {
    //   minute = "0" + dateGame.getMinutes();
    // }
    // this.Heure = dateGame.getHours() + ":" + minute;

    // this.trouverStats(this.Game.teams.away.team.id);
    // this.trouverStats(this.Game.teams.home.team.id);
  },
  methods: {
    obtenirPrediction:function(gamePk)
    {
        // eslint-disable-next-line no-console
        console.log(gamePk);
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
      if (equipe == "4") image = "Philadelphia.png";
      if (equipe == "5") image = "Pittsburgh.png";
      if (equipe == "6") image = "Boston.png";
      if (equipe == "7") image = "Buffalo.png";
      if (equipe == "8") image = "Montreal.png";
      if (equipe == "9") image = "Ottawa.png";
      if (equipe == "10") image = "Toronto.png";
      if (equipe == "11") image = "???.png";
      if (equipe == "12") image = "Carolina.png";
      if (equipe == "13") image = "Florida.png";
      if (equipe == "14") image = "TampaBay.png";
      if (equipe == "15") image = "Washington.png";
      if (equipe == "16") image = "Chicago.png";
      if (equipe == "17") image = "Detroit.png";
      if (equipe == "18") image = "Nashville.png";
      if (equipe == "19") image = "StLouis.png";
      if (equipe == "20") image = "Calgary.png";
      if (equipe == "21") image = "Colorado.png";
      if (equipe == "22") image = "Edmonton.png";
      if (equipe == "23") image = "Vancouver.png";
      if (equipe == "24") image = "Anaheim.png";
      if (equipe == "25") image = "Dallas.png";
      if (equipe == "26") image = "LosAngeles.png";
      if (equipe == "27") image = "arizona.png";
      if (equipe == "28") image = "SanJose.png";
      if (equipe == "29") image = "columbus.png";
      if (equipe == "30") image = "Minnesota.png";
      if (equipe == "53") image = "arizona.png";
      if (equipe == "52") image = "winnipeg.png";
      if (equipe == "54") image = "vegas.png";
      return image;
    }
  }
};
</script>
