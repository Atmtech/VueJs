<template>
  <div class="content-wrapper">
    <div
      class="navbar navbar-dark bg-dark shadow-sm"
      style="background-color: #4F4943"
    >
      <div class="container d-flex justify-content-between">
        <!-- <a href="/" class="navbar-brand d-flex align-items-center">
          <img src="../assets/logo.png" width="70" height="60" />
          <h1>VA-CHIER.COM |</h1>
          <div style="text-transform: uppercase; padding-left:10px;">
            À tous ceux qui le mérite
            <br />
            Allez donc chier !!!
          </div>
        </a> -->
      </div>
    </div>
    <div class="pt-2">
      <slot></slot>
    </div>

    <div
      class="container-fluid"
      style="background-color: white; padding-top: 50px; padding-bottom: 50px;"
    >
      <div class="container text-center">
        <h5 class=" display-4">NOS TOPS MERDEUX</h5>
        <br />
        <div class="row">
          <div class="col-sm text-left">
            <h4>Top 10 des commentaires merdeux</h4>
            <div v-for="item in this.insultes" v-bind:key="item._id">
              <table style="width: 100%">
                <tr>
                  <td style="width: 80%">{{ item.Titre }}</td>
                  <td style="width: 20%; font-size: 0.8em;" class="text-right">
                    {{ item.NombreJaime }} votes
                  </td>
                </tr>
              </table>
              <progress-bar
                size="large"
                :val="(item.NombreJaime / nombreTotalInsulte) * 100"
              ></progress-bar>
            </div>
          </div>
          <div class="col-sm  text-left">
            <h4>Top 10 des régions de marde !</h4>
          </div>
        </div>
      </div>
    </div>

    <div
      class="container-fluid"
      style="background-color: #CEBFAF; padding-top: 50px; padding-bottom: 50px;"
    >
      <div class="container text-center">
        <div id="fb-root"></div>

        <h5 class=" display-4">PARTAGE TA MARDE</h5>

        <a
          href="http://reddit.com/submit?url=http://va-chier.com&amp;title=Ajouter de la merde"
          target="_blank"
        >
          <img
            src="https://simplesharebuttons.com/images/somacro/reddit.png"
            alt="Reddit"
          />
        </a>
        &nbsp;
        <a
          href="http://www.facebook.com/sharer.php?u=http://va-chier.com"
          target="_blank"
        >
          <img
            src="https://simplesharebuttons.com/images/somacro/facebook.png"
            alt="Facebook"
          />
        </a>
        &nbsp;
        <a
          href="http://www.linkedin.com/shareArticle?mini=true&amp;url=http://va-chier.com"
          target="_blank"
        >
          <img
            src="https://simplesharebuttons.com/images/somacro/linkedin.png"
            alt="LinkedIn"
          />
        </a>
        &nbsp;
        <a
          href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"
          target="_blank"
        >
          <img
            src="https://simplesharebuttons.com/images/somacro/pinterest.png"
            alt="Pinterest"
          />
        </a>
        &nbsp;
        <a
          href="https://twitter.com/share?url=http://va-chier.com&amp;text=De la belle merde&amp;hashtags=va-chier.com"
          target="_blank"
        >
          <img
            src="https://simplesharebuttons.com/images/somacro/twitter.png"
            alt="Twitter"
          />
        </a>
        &nbsp;
        <a
          href="http://www.digg.com/submit?url=http://va-chier.com"
          target="_blank"
        >
          <img
            src="https://simplesharebuttons.com/images/somacro/diggit.png"
            alt="Digg"
          />
        </a>
      </div>
    </div>

    <div
      class="container-fluid"
      style="background-color: #4F4943; padding-top: 25px; padding-bottom: 25px;"
    >
      <div class="container text-center">
        <h6 class="text-white">
          © Copyright 2020 VA-CHIER.COM - Toutes mardes réservés
        </h6>
      </div>
    </div>
  </div>
</template>
<script>
import Services from "../services/services";
import ProgressBar from "vue-simple-progress";
export default {
  props: {},
  components: {
    ProgressBar
  },
  data: function() {
    return {
      insultes: [],
      nombreTotalInsulte: 0
    };
  },
  mounted() {
    this.obtenirTop10Commentaire();
  },
  methods: {
    obtenirTop10Commentaire: function() {
      Services.exec("ObtenirTop10Insulte", {}).then(response => {
        this.insultes = response.data;
        this.insultes.forEach(element => {
          this.nombreTotalInsulte += element.NombreJaime;
        });
      });
    }
  }
};
</script>
