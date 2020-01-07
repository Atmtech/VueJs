import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
// import TableauBord from "../views/TableauBord.vue";
// import GenererApplication from "../views/GenererApplication.vue";
// import Identification from "../views/Identification.vue";
// import ListeApplication from "../views/ListeApplication.vue";
// import Service from "../views/Service.vue";
// import Verification from "../views/Verification.vue";
// import CommandeOpenShift from "../views/CommandeOpenShift.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;

