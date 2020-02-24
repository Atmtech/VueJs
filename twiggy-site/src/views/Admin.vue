<template>
  <MasterView>
    <div class="container-fluid bg-white pt-2  pb-2" v-if="!estAdmin">
      Mot de passe
      <input class="form-control" v-model="motPasse" />
      <button
        type="submit"
        class="btn btn-primary btn-block mb-2 mt-3"
        v-on:click="authentifie"
      >
        Ok
      </button>
    </div>
    <div class="container-fluid pt-2" v-if="estAdmin">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Listes des médias</h5>
          <p class="card-text"></p>

          <table class="table table-dark ">
            <thead>
              <tr>
                <th>Groupe</th>
                <th>Style</th>
                <th>Étudiants</th>
                <th>Url</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="media in ListeMedia" v-bind:key="media.Id">
              <td>{{ media.NoGroupe }}</td>
              <td>{{ media.Style }}</td>
              <td>{{ media.Etudiants }}</td>
              <td>{{ media.UrlMedia }}</td>
              <td>
                <button
                  type="submit"
                  class="btn btn-danger btn-block mb-2 mt-3"
                  v-on:click="supprimer(media)"
                >
                  Supprimer
                </button>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MasterView>
</template>

<script>
import Services from "../services/services";

export default {
  components: {
    MasterView: () => import("../components/MasterView.vue")
  },
  data: function() {
    return {
      NoGroupe: null,
      Style: null,
      Etudiants: null,
      UrlMedia: null,
      ListeMedia: [],
      estAdmin: false,
      motPasse: null
    };
  },
  methods: {
    supprimer: function(media) {
      var corps = { NoMedia: media.NoMedia };

      Services.post("SupprimerMedia", {}, corps).then(response => {
        this.ListeMedia = response.data;
      });
    },
    authentifie: function() {
      if (this.motPasse == "ourson") this.estAdmin = true;
    }
  },
  mounted() {
    Services.exec("ObtenirMedia", {}).then(response => {
      this.ListeMedia = response.data;
    });
  }
};
</script>
