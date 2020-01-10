import Vue from "vue";
import VueRouter from "vue-router";

//import Accueil from "../views/Accueil.vue";
//import Test from "../views/Test.vue";
Vue.use(VueRouter);

const routes = [
  {
     path: "/",
     name: "Accueil",
     component: () => import('../views/Accueil.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;

