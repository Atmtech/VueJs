<template>
  <div>
    <Entete></Entete>

    <div class="pt-2 pb-4">
      <slot></slot>
    </div>

    <Top10></Top10>
    <ReseauSociaux></ReseauSociaux>
    <Copyright></Copyright>
  </div>
</template>
<script>
import ReseauSociaux from "../components/ReseauSociaux.vue";
import Copyright from "../components/Copyright.vue";
import Top10 from "../components/Top10.vue";
import Entete from "../components/Entete.vue";

export default {
  props: {},
  components: {
    ReseauSociaux,
    Copyright,
    Top10,
    Entete
  },
  data: function() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
