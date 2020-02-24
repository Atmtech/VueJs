<template>
  <div>
    <div style="color:white">{{ SessionState }}</div>
    <Entete></Entete>

    <div>
      <slot></slot>
    </div>
    <PiedPage></PiedPage>
  </div>
</template>
<script>
export default {
  props: {},
  components: {
    Entete: () => import("../components/Entete.vue"),
    PiedPage: () => import("../components/PiedPage.vue")
  },
  data: function() {
    return {
      SessionState: null
    };
  },
  mounted() {
    this.SessionState = ""; //this.$store.state.session.gestionnaire;
  },
  methods: {}
};
</script>
