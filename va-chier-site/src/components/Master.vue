<template>
  <div>
    <Entete></Entete>

    <div class="pb-4">
      <slot></slot>
    </div>

    <Top10></Top10>
    <ReseauSociaux></ReseauSociaux>
    <Copyright></Copyright>
  </div>
</template>
<script>

export default {
  props: {},
  components: {
    ReseauSociaux: () => import("../components/ReseauSociaux.vue"),
    Copyright: () => import("../components/Copyright.vue"),
    Top10: () => import("../components/Top10.vue"),
    Entete: () => import("../components/Entete.vue"),
  },
  data: function() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
