<template>
  <MasterView>
    <div class="container-fluid bg-white pt-2 pb-2" v-if="estEnregistre">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Successful operation.</h5>
          <p class="card-text">
            Thank you !
            {{ Etudiants }}
          </p>
        </div>
      </div>
    </div>
    <div class="container-fluid pt-2" v-if="!estEnregistre">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">WRITE THE REQUIRED INFORMATIONS</h5>
          <p class="card-text"></p>

          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold ">
              What is your group number ?
            </div>
            <input class="form-control" v-model="NoGroupe" />
          </div>

          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold">
              What is your movie style ? (Documentary, horror, scifi, etc)
            </div>
            <input class="form-control" v-model="Style" />
          </div>
          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold">List all the student name</div>
            <input class="form-control" v-model="Etudiants" />
          </div>
          <div class="row pl-3 pr-3">
            <div class="label font-weight-bold">
              Write the url address of your movie
            </div>
            <input class="form-control" v-model="UrlMedia" />
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
      NoGroupe: null,
      Style: null,
      Etudiants: null,
      UrlMedia: null,
      estEnregistre: false
    };
  },
  methods: {
    enregistrer: function() {
      var corps = {
        NoGroupe: this.NoGroupe,
        Style: this.Style,
        Etudiants: this.Etudiants,
        UrlMedia: this.UrlMedia
      };
      // eslint-disable-next-line no-unused-vars
      Services.post("SauvegarderMedia", {}, corps).then(response => {
        this.estEnregistre = true;
      });
    }
  },
  mounted() {}
};
</script>
