<template>
  <div
    class="card"
    v-bind:class="[couleurTexte, couleurFond]"
    style="width: 16.93rem"
  >
    <div class="card-body">
      <div class="row text-center font-weight-bold">
        <div class="col" style="font-size:1em;">
          {{ NomVisiteur }} <br />
          @<br />
          {{ NomLocal }}
        </div>
      </div>
      <div class="row text-center small">
        <div class="col">({{ NomArena }})</div>
      </div>
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
          <img
            src="../assets/star-icon.png"
            style="width:25px"
            v-if="estPointagePredictionExacte"
          />
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
                    style="width: 2em;"
                    v-bind:alt="NomVisiteur"
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
              v-for="prediction in autrePrediction"
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
  props: ["Prediction"],
  data: function() {
    return {
      predictions: [],
      autrePrediction: this.Prediction.autrePrediction,
      couleurTexte: this.Prediction.estPredictionGagnante
        ? "text-black"
        : "text-black",
      couleurFond: this.Prediction.estPredictionGagnante
        ? "bg-success"
        : this.Prediction.pointagePredictionVisiteur == 0 &&
          this.Prediction.pointagePredictionLocal == 0
        ? "bg-secondary"
        : "bg-danger",
      estPointagePredictionExacte: this.Prediction.estPointagePredictionExacte,
      GamePk: this.Prediction.gamePk,
      Heure: this.Prediction.heure,
      LogoVisiteur: this.Prediction.equipeVisiteur.logo,
      LogoLocal: this.Prediction.equipeLocal.logo,
      NomVisiteur: this.Prediction.equipeVisiteur.nom,
      NomLocal: this.Prediction.equipeLocal.nom,
      PointageVisiteur: this.Prediction.pointageVisiteur,
      PointageLocal: this.Prediction.pointageLocal,
      PredictionVisiteur: this.Prediction.pointagePredictionVisiteur,
      PredictionLocal: this.Prediction.pointagePredictionLocal,
      NomArena: this.Prediction.arena,
      RangVisiteur: this.Prediction.equipeVisiteur.position,
      RangLocal: this.Prediction.equipeLocal.position,
      MatchJoueVisiteur: this.Prediction.equipeVisiteur.matchJoue,
      MatchJoueLocal: this.Prediction.equipeLocal.matchJoue,
      VictoireVisiteur: this.Prediction.equipeVisiteur.gagne,
      VictoireLocal: this.Prediction.equipeLocal.gagne,
      DefaiteVisiteur: this.Prediction.equipeVisiteur.perdu,
      DefaiteLocal: this.Prediction.equipeLocal.perdu,
      ButContreVisiteur: this.Prediction.equipeVisiteur.butContre,
      ButContreLocal: this.Prediction.equipeLocal.butContre,
      ButProduitVisiteur: this.Prediction.equipeVisiteur.butCompte,
      ButProduitLocal: this.Prediction.equipeLocal.butCompte,
      PointVisiteur: this.Prediction.equipeVisiteur.points,
      PointLocal: this.Prediction.equipeLocal.points,
      StreakVisiteur: this.Prediction.equipeVisiteur.streak,
      StreakLocal: this.Prediction.equipeLocal.streak,
      estAfficher: false
    };
  },
  mounted() {},
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
    }
  }
};
</script>
