import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);
const vuexPersist = new VuexPersist({
  key: "prediction-nhl",
  storage: window.localStorage
});

const state = {
  courriel: null,
  motPasse: null
};

const mutations = {
  AJOUTER_UTILISATEUR(state, data) {
    state.courriel = data.courriel;
    state.motPasse = data.motPasse;
  },
  SUPPRIMER_UTILISATEUR(state) {
    state.courriel = null;
    state.motPasse = null;
  }
};

const actions = {
  ajouterUtilisateur(context, data) {
    context.commit("AJOUTER_UTILISATEUR", data);
  },
  supprimerUtilisateur(context) {
    context.commit("SUPPRIMER_UTILISATEUR");
  }
};

const getters = {
  obtenirNomUtilisateur(state) {
    return state.courriel;
  },
  obtenirMotPasse(state) {
    return state.motPasse;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexPersist.plugin]
});
