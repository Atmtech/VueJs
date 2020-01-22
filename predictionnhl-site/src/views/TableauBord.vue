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

      <br>
    </div>
    <div class="container  bg-white pt-4 pb-2">
      <label class="font-weight-bold">Sélectionner la date de la prédiction</label>
      <select class="form-control bg-dark text-white">
        <option>test</option>
      </select>
    </div>
    <classement></classement>
  </Master>
</template>

<script>
//import Services from "../services/services";

export default {
  components: {
    Master: () => import("../components/Master.vue"),
    Classement: () => import("../components/Classement.vue")
  },
  data: function() {
    return {
      messageErreur: "",
      estErreur: false
    };
  },
  methods: {},
  mounted() {
    // Services.exec("Authentification",this.$store.state, {
    //     Courriel: this.Courriel,
    //     MotPasse: this.MotPasse
    //   }).then(response => {});
  }
};
</script>
