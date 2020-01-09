<template>
  <div>
    <div class="card" style="width: 16.6rem;">
      <div class="card-body">
        <h6>{{ Titre }}</h6>
        <div style="font-size: 0.8em;">
          <div v-on:click="jaime" style="cursor:pointer;">
            <img src="../assets/likebrun.png" />
            {{ NombreJaime }} votes
          </div>
        </div>

        <hr />

        <p class="card-text" style="font-size: 0.8em;">{{ Description }}</p>
        <div
          style="color: rgb(159, 108, 35); font-size: 11px; font-weight: bold;"
        >
          <div style="color: #7C795C; font-size: 11px; font-weight: bold;">
            {{ formaterDate(DateCreation) }}
          </div>
          
          <a v-bind:href="Url" target="_new"> {{ Provenance }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Services from "../services/services";

export default {
  props: ["Insulte"],
  data: function() {
    return {
      Url: null,
      Titre: null,
      Id: null,
      NombreJaime: null,
      Description: null,
      DateCreation: null,
      Localisation: null,
      Provenance: null
    };
  },
  mounted() {
    (this.Url = "https://www.google.ca/maps/search/@" + this.Insulte.Localisation.Latitude + "," + this.Insulte.Localisation.Longitude),
    (this.Titre = this.Insulte.Titre),
      (this.Id = this.Insulte._id),
      (this.NombreJaime = this.Insulte.NombreJaime),
      (this.Description = this.Insulte.Description),
      (this.DateCreation = this.Insulte.DateCreation),
      (this.Localisation = this.Insulte.Localisation),
      (this.Provenance =
        this.Insulte.Localisation.Ville +
        " " +
        this.Insulte.Localisation.Region +
        ", " +
        this.Insulte.Localisation.Pays);
  },
  methods: {
    jaime: function() {
      Services.exec("Jaime", {
        Id: this.Insulte._id
      }).then(response => {
        Services.exec("ObtenirInsulte", {
          Id: this.Insulte._id,
          x: response
        }).then(response => {
          this.NombreJaime = response.data.NombreJaime;
        });
      });
    },
    remplirAdresseGoogle: function() {
      return "https://www.google.ca/maps/search/" + this.GoogleMap;
    },
    formaterDate: function(date) {
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      var dateFormat = new Date(date);
      return dateFormat.toLocaleDateString("fr-CA", options);
    }
  }
};
</script>
