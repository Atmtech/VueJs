<template>
  <Master>
    <div class="container bg-white pt-4 pb-4">
      <ol class="breadcrumb float-sm-left">
        <li class="breadcrumb-item">
          <router-link to="/#">Accueil</router-link>
        </li>
        <li class="breadcrumb-item active">Tableau de bord</li>
      </ol>
      <div class="card " v-if="estErreur">
        <div class="card-header bg-danger text-white">
          <h3 class="card-title">Erreur</h3>
        </div>
        <div class="card-body  bg-dark text-white">{{ messageErreur }}</div>
      </div>

      <br />
    </div>
    <div class="container  bg-white pt-4 pb-2">
      <label class="font-weight-bold"
        >Sélectionner la date de la prédiction</label
      >
      <select
        class="form-control bg-dark text-white"
        v-model="datePredictionSelectionne"
        @change="onChangeDatePrediction()"
      >
        <option v-for="dateItem in datePrediction" v-bind:key="dateItem">
          {{ dateItem }}
        </option>
      </select>
     
      <div class="row pl-3">
        <div
          v-for="item in this.listeGame"
          v-bind:key="item.gamePk"
          class="pt-2"
        >
          <div class="pr-2">
            <Prediction v-bind:Game="item"></Prediction>
          </div>
        </div>
      </div>
    </div>
    <classement></classement>
  </Master>
</template>

<script>
import Services from "../services/services";

export default {
  components: {
    Master: () => import("../components/Master.vue"),
    Classement: () => import("../components/Classement.vue"),
    Prediction: () => import("../components/Prediction.vue")
  },
  data: function() {
    return {
      messageErreur: "",
      estErreur: false,
      datePrediction: [],
      datePredictionSelectionne: "",
      listeGame: []
    };
  },
  methods: {
    onChangeDatePrediction: function() {
      this.rafraichir();
    },
    rafraichir: function() {
      Services.exec("ObtenirGame", this.$store.state, {
        DateDebut: this.datePredictionSelectionne
      }).then(response => {
        this.listeGame = response.data;
      });
    }
  },
  mounted() {
    Services.exec("ObtenirListeDatePrediction", this.$store.state, {}).then(
      response => {
        this.datePrediction = response.data;
      }
    );
  }
};
</script>
