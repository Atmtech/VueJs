<template>
  <Master>
    <div class="container bg-white pt-4 pb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/#">Accueil</router-link>
        </li>
        <li class="breadcrumb-item active">Identification</li>
      </ol>

      <div class="card " v-if="estErreur">
        <div class="card-header bg-danger text-white">
          <h3 class="card-title">Erreur</h3>
        </div>
        <div class="card-body  bg-dark text-white">{{ messageErreur }}</div>
      </div>

      <br />

      <input
        type="email"
        class="form-control"
        v-model="Courriel"
        placeholder="Nom d'utilisateur"
      /><br />
      <input
        type="password"
        class="form-control"
        placeholder="Mot de passe"
        v-model="MotPasse"
      />
      <br />
      <button
        type="submit"
        class="btn btn-primary btn-block"
        v-on:click="seConnecter"
      >
        Se connecter
      </button>
    </div>
  </Master>
</template>

<script>
import Services from "../services/services";

export default {
  components: {
    Master: () => import("../components/Master.vue")
  },
  data: function() {
    return {
      Courriel: "",
      MotPasse: "",
      messageErreur: "",
      estErreur: false
    };
  },
  methods: {
    seConnecter: function() {
      Services.exec("Authentification",this.$store.state, {
        Courriel: this.Courriel,
        MotPasse: this.MotPasse
      }).then(response => {
        if (response.data == true) {
          this.$store.dispatch("ajouterUtilisateur", {
            courriel: this.Courriel,
            motPasse: this.MotPasse
          });
          this.$router.push("/TableauBord");
        } else {
          this.estErreur = true;
          this.messageErreur = "(401) Mauvais courriel ou mot de passed";
        }
      });
    }
  },
  mounted() {}
};
</script>
