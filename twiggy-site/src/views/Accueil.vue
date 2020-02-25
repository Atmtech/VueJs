<template>
  <MasterView>
    <div class="container-fluid bg-white pt-2 pb-2" v-if="estEnregistre">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Successful operation.</h5>
          <p class="card-text">
            Thank you !
            {{ Students }}
          </p>
        </div>
      </div>
    </div>
    <div class="container-fluid pt-2" v-if="!estEnregistre">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">WRITE THE REQUIRED INFORMATIONS</h5>
          <p class="card-text"></p>

          <div class="row" pl-3 pr-3 v-if="erreurs.length">
            <div class="col-12">
              <div class="alert alert-danger">
                <h5><i class="icon fas fa-ban"></i> Some errors ...</h5>
                <ul>
                  <li v-for="erreur in erreurs" v-bind:key="erreur">
                    {{ erreur }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold ">
              What is your group number ?
            </div>
            <input class="form-control" v-model="Group" />
          </div>

          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold">
              What is your movie style ? (Documentary, horror, scifi, etc)
            </div>
            <input class="form-control" v-model="Style" />
          </div>
          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold">List all the student name</div>
            <input class="form-control" v-model="Students" />
          </div>
          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold">
              Write the url address of your movie
            </div>
            <input class="form-control" v-model="Url" />
          </div>

          <div class="label mt-3 font-weight-bold">
            If you don't know howto upload your movie follow the link below
          </div>

          <div class="card mt-3">
            <div class="card-body bg-dark">
              <a
                href="https://support.google.com/youtube/answer/57407?co=GENIE.Platform%3DDesktop&hl=en"
                target="_blank"
                ><img src="../assets/YouTube.png" style="width: 125px"
              /></a>
              <a href="https://vimeo.com/fr/upload" target="_blank"
                ><img src="../assets/vimeo.png" style="width: 125px"
              /></a>
              <a
                href="https://faq.dailymotion.com/hc/en-us/articles/115009030368-Upload-videos-to-dailymotion"
                target="_blank"
                ><img src="../assets/dailymotion.png" style="width: 125px"
              /></a>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block mb-2 mt-3"
            v-on:click="enregistrer"
          >
            SAVE YOUR INFORMATION
          </button>
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
      Group: null,
      Style: null,
      Students: null,
      Url: null,
      estEnregistre: false,
      erreurs: []
    };
  },
  methods: {
    validerChampsRequis: function(champs) {
      if (!eval("this." + champs)) {
        this.erreurs.push(champs + " mandatory.");
      }
    },
    validerFormulaire: function() {
      if (this.Group && this.Style && this.Students && this.Url) {
        return true;
      } else {
        this.erreurs = [];
        this.validerChampsRequis("Group");
        this.validerChampsRequis("Style");
        this.validerChampsRequis("Students");
        this.validerChampsRequis("Url");

        return false;
      }
    },

    enregistrer: function() {
      if (this.validerFormulaire()) {
        var corps = {
          NoGroupe: this.Group,
          Style: this.Style,
          Etudiants: this.Students,
          UrlMedia: this.Url
        };
        // eslint-disable-next-line no-unused-vars
        Services.post("SauvegarderMedia", {}, corps).then(response => {
          this.estEnregistre = true;
        });
      }
    }
  },
  mounted() {}
};
</script>
