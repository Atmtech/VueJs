<template>
  <div>
    <Entete></Entete>
    <div>
      <slot></slot>
    </div>
    <Copyright></Copyright>
  </div>
</template>
<script>
export default {
  props: {},
  components: {
    Copyright: () => import("../components/Copyright.vue"),
    Entete: () => import("../components/Entete.vue")
  },
  data: function() {
    return {
      estAuthentifie: false,
      utilisateur: null
    };
  },
  mounted() {
    if (
      this.$store.state.courriel != null &&
      this.$store.state.courriel != "" &&
      this.$router.currentRoute.path != "/Login"
    ) {
      this.estAuthentifie = true;
      this.utilisateur = this.$store.state.courriel;
      this.$router.push("/TableauBord");
    } else {
      this.estAuthentifie = false;
    }
  },
  methods: {}
};
</script>
