<template>
  <Master>
    <div class="container bg-white pt-4 pb-4">
      <h4>
        Le site permet de faire des prédictions de pointages en utilisant les
        données de la NHL.
      </h4>

      <button type="button" class="btn btn-primary" v-if="!estAuthentifie"
      v-on:click="login"
      >
        Identifiez vous
      </button>

      <button type="button" class="btn btn-primary" v-if="estAuthentifie"
      v-on:click="tableauBord"
      >
        Tableau de bord
      </button>
    </div>
  </Master>
</template>

<script>
//import Services from "../services/services";

export default {
  components: {
    Master: () => import("../components/Master.vue")
  },
  data: function() {
    return {
      estAuthentifie: false
    };
  },
  methods: {
    tableauBord:  function(){
       this.$router.push("/TableauBord");
    },
    login: function(){
       this.$router.push("/Login");
    }
  },
  mounted() {
    
 if (
      this.$store.state.courriel != null &&
      this.$store.state.courriel != "" &&
      this.$router.currentRoute.path != "/Login"
    ) {
      this.estAuthentifie = true;
    } else {
      this.estAuthentifie = false;
    }

  }
};
</script>
