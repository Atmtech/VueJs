<template>
  <div
    class="pb-4 pt-4"
    style="background-color: white;"
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
                <td style="width: 80%;">{{ item.Titre == "" ? item.Description :item.Titre  }}</td>
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

          <div v-for="item in this.localisations" v-bind:key="item._id">
            
            <table style="width: 100%">
              <tr>
                <td style="width: 80%">{{ item._id.pays }}, {{ item._id.ville }}</td>
                <td style="width: 20%; font-size: 0.8em;" class="text-right">
                  {{ item.count }} votes
                </td>
              </tr>
            </table>

            <progress-bar
              size="large"
              :val="(item.count / nombreTotalLocalisation) * 100"
            ></progress-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from "vue-simple-progress";
import Services from "../services/services";
export default {
  components: {
    ProgressBar
  },
  data: function() {
    return {
      insultes: [],
      localisations: [],
      nombreTotalInsulte: 0,
      nombreTotalLocalisation: 0
    };
  },
  mounted() {
    this.obtenirTop10Commentaire();
    this.obtenirTop10Localisation();
  },
  methods: {
    obtenirTop10Localisation: function() {
      Services.exec("ObtenirTop10Localisation", {}).then(response => {
        this.localisations = response.data;
       
         this.localisations.forEach(element => {
           this.nombreTotalLocalisation += element.count;
         });
      });
    },
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
