<template>
  <div>
    ok
  </div>
</template>

<script>
import Services from "../services/services";

export default {
  components: {
  },
  data: function() {
    return {};
  },
  methods: {
    test: function() {
      Services.exec("ObtenirNombrePageInsulte", {
        NombreParPage: this.nombreParPage
      });
    }
  },
  mounted() {
    this.test();
  }
};
</script>
