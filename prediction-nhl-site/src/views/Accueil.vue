<template>
  <Master>
    <div class="container bg-white pt-4 pb-4">
      <h4>
        Le site permet de faire des prédictions de pointages en utilisant les
        données de la NHL.
      </h4>

      <button type="button" class="btn btn-primary" 
      v-on:click="login"
      >
        Identifiez vous
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
    return {};
  },
  methods: {
    login: function(){
       this.$router.push("/Login");
    }
  },
  mounted() {}
};
</script>
