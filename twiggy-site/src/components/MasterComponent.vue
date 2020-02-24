<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import Services from "../services/services";
export default {
  components: {},
  data: function() {
    return {
      EvaluationRendement: null
    };
  },
  mounted() {},
  methods: {
    estBarreEmploye: function(contexte) {
      return Services.estBarreEmploye(
        this.EvaluationRendement,
        this.$store,
        contexte
      );
    },
    estBarreGestionnaire: function(contexte) {
      return Services.estBarreGestionnaire(
        this.EvaluationRendement,
        this.$store,
        contexte
      );
    }
  }
};
</script>
