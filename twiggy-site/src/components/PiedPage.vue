<template>
  <div class="container-fluid bg-dark text-center text-white pt-3 pb-3">
    <small
      >V2020.1 <a v-on:click.shift="ouvrirAdmin"><b>π</b></a> <br>{{ api}} </small
    >
   
  </div>
</template>
<script>
import config  from "../config/config"

export default {
  data: function() {
    return {
      api: config.api
    };
  },
  mounted() {},
  methods: {
    ouvrirAdmin: function(){
       this.$router.push({
        name: "Admin"
      });
    }
  }
};
</script>
