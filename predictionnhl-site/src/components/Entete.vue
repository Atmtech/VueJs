<template>
  
    <div class="container text-align-left pt-2 pb-2">
      <div class="row">
        <div class="col-0">
          <img src="../assets/nhl.png" style="width: 50px" />
        </div>
        <div class="col-8"><h2 style="color:white;">PredictionNHL</h2></div>
        <div class="col-3">
          <button
            type="submit"
            class="btn btn-primary btn-block"
            v-on:click="seDeconnecter"
            v-if="estAuthentifie"
          >
            Se deconnecter
          </button>
        </div>
      </div>
  
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      estAuthentifie: false
    };
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
  },
  methods: {
    seDeconnecter: function() {
      this.$store.dispatch("supprimerUtilisateur");
      this.$router.push("/Login");
      this.estAuthentifie = false;
    }
  }
};
</script>
