<template>
  <div
    class="container bg-info"
    style="padding-top: 25px; padding-bottom: 25px;"
  >
    <div>
      <table class="table table-dark">
        <thead>
          <tr>
            <th>Rang</th>
            <th>Nom</th>
            <th>Total prediction</th>
            <th>Pointage exact</th>
            <th>Victoire</th>
            <th>Échec</th>
            <th>% victoire</th>
            <th>% pointage exact</th>
            <th>Pointage</th>
          </tr>
        </thead>
        <tbody
          v-for="(classement,index) in classements"
          v-bind:key="classement.courriel"
          
        >
          <td>{{ reprendreComptePlus1(index) }}</td>
          <td>{{ classement.prenom }} {{ classement.nom }}</td>
          <td>{{ classement.nombreTotalPrediction }}</td>
          <td>{{ classement.nombrePointageCorrect }}</td>
          <td>{{ classement.nombreVictoire }}</td>
          <td>{{ classement.nombreEchec }}</td>
          <td>{{ ((classement.nombreVictoire / classement.nombreTotalPrediction) * 100).toFixed(2) }} % </td>
          <td>{{ ((classement.nombrePointageCorrect / classement.nombreTotalPrediction) * 100).toFixed(2) }} % </td>
          <td>{{ classement.pointage }}</td>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Services from "../services/services";

export default {
  data: function() {
    return {
      classements: null,
      rang: 2,
    };
  },
  mounted() {
    Services.exec("ObtenirClassement", this.$store.state, {
      DateDebut: "2019-10-02"
    }).then(response => {
      this.classements = response.data.sort(function(a, b) {
        if (b.pointage == a.pointage) return 0;
        if (b.pointage < a.pointage) return -1;
        if (b.pointage > a.pointage) return 1;
      });
    });
  },
  methods: {
      reprendreComptePlus1:function(valeurActuel)
      {
          return valeurActuel + 1;
      }
  }
};
</script>
