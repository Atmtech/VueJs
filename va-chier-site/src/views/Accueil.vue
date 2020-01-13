<template>
  <Master>
    <div
      class="container-fluid"
      style="background-color: rgb(132,82,31); color: white;"
    >
      <div class="container pt-2 pb-2">
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn"
              style="background-color: #4C2F12; color: white;"
              v-on:click="voirAjouterMerde"
            >
              AJOUTE TA MERDE
            </button>
          </div>

          <div class="col">
            <table>
              <tr>
                <td>
                  <button
                    type="button"
                    v-on:click="precedente"
                    class="btn"
                    style="background-color: #4C2F12; color: white;"
                  >
                    <img src="../assets/precedent.png" />
                  </button>
                </td>
                <td>
                  <select
                    class="form-control"
                    v-model="pageSelectionne"
                    style="background-color: rgb(132,82,31); color: white;"
                    @change="onChangePage($event)"
                  >
                    <option v-for="page in pages" :value="page" :key="page">{{
                      page
                    }}</option>
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    v-on:click="prochaine"
                    class="btn"
                    style="background-color: #4C2F12; color: white;"
                  >
                    <img src="../assets/prochaine.png" />
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="rechercher votre merde"
              v-on:keyup="rechercher"
              v-model="filtre"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="pt-3" v-if="estAjouterMerde">
        <div class="card">
          <div class="card-body">
            <div class="row" v-if="erreurs.length">
              <div class="col-12">
                <div class="alert alert-danger">
                  <h5>
                    <i class="icon fas fa-ban"></i> Des erreurs dans votre merde
                  </h5>
                  <ul>
                    <li v-for="erreur in erreurs" v-bind:key="erreur">
                      {{ erreur }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Titre</label>
              <input
                type="text"
                class="form-control"
                placeholder="Titre de marde"
                maxlength="50"
                v-model="titre"
              />
              <small
                >Assurez-vous de répandre le plus de colliforme possible.</small
              >
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea
                type="text"
                maxlength="500"
                class="form-control"
                placeholder="Description"
                v-model="description"
              />
              <small>Signifier au monde entier votre plus beau étron.</small>
            </div>

            <div class="form-group">
              <label>Votre insulte</label><br />
              <select class="form-control" v-model="insulte">
                <option>va donc chier</option>
                <option>se fait chier dessus solidement</option>
                <option>se fait faire un bukkake de marde</option>
                <option>te roule dans la marde</option>
              </select>
              <small class="form-text text-muted"
                >Enduisez le tout d'une belle insulte à saveur de marde.</small
              >
            </div>

            <button
              type="button"
              class="btn"
              style="background-color: rgb(132,82,31); color: white;"
              v-on:click="enregistrerInsulte"
            >
              ENREGISTRER
            </button>
            &nbsp;
            <button
              type="button"
              class="btn"
              style="background-color: rgb(132,82,31); color: white;"
              v-on:click="annulerInsulte"
            >
              ANNULER
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-for="item in this.insultes" v-bind:key="item._id" class="pt-3">
          <div class="pl-3 pb-2">
            <Insulte v-bind:Insulte="item"></Insulte>
          </div>
        </div>
      </div>
    </div>
  </Master>
</template>

<script>
import Services from "../services/services";
//import axios from "axios";

export default {
  components: {
    Master: () => import("../components/Master.vue"),
    Insulte: () => import("../components/Insulte.vue")
  },
  data: function() {
    return {
      insultes: [],
      erreurs: [],
      insulte: "va donc chier",
      titre: null,
      description: null,
      estAjouterMerde: false,
      pages: [],
      nombreParPage: 12,
      pageSelectionne: 1,
      nombreTotalPage: 0,
      filtre: null
    };
  },
  methods: {
    rechercher: function() {
      if (this.filtre == "") {
        this.obtenirInsulte();
      } else {
        this.pages = [];
        Services.exec("ObtenirInsulteParPageFiltre", {
          NombreParPage: this.nombreParPage,
          Page: this.pageSelectionne,
          Filtre: this.filtre
        }).then(response => {
          this.insultes = response.data;
          Services.exec("ObtenirNombrePageFiltre", {
            NombreParPage: this.nombreParPage,
            Filtre: this.filtre
          }).then(response => {
            var nombrePage = response.data;
            this.nombreTotalPage = nombrePage;
            for (let index = 1; index < nombrePage + 1; index++) {
              this.pages.push(index);
            }
          });
        });
      }
    },
    precedente: function() {
      if (this.pageSelectionne != 1) {
        this.pageSelectionne = this.pageSelectionne - 1;
        this.obtenirInsulte();
      }
    },
    prochaine: function() {
      if (this.pageSelectionne != this.nombreTotalPage) {
        this.pageSelectionne = this.pageSelectionne + 1;
        this.obtenirInsulte();
      }
    },
    onChangePage: function(event) {
      this.pageSelectionne = event.target.value;
      this.obtenirInsulte();
    },
    obtenirInsulte: function() {
      this.pages = [];

      Services.exec("ObtenirNombrePageInsulte", {
        NombreParPage: this.nombreParPage
      }).then(response => {
        var nombrePage = response.data;
        this.nombreTotalPage = nombrePage;
        for (let index = 1; index < nombrePage + 1; index++) {
          this.pages.push(index);
        }
      });

      Services.exec("ObtenirInsulteParPage", {
        NombreParPage: this.nombreParPage,
        Page: this.pageSelectionne
      }).then(response => {
        this.insultes = response.data;
      });
    },
    validerChampsRequis: function(champs) {
      if (!eval("this." + champs)) {
        this.erreurs.push(champs + " requis.");
      }
    },

    validerFormulaire: function() {
      if (this.titre && this.description) {
        return true;
      } else {
        this.erreurs = [];
        this.validerChampsRequis("titre");
        this.validerChampsRequis("description");

        return false;
      }
    },

    voirAjouterMerde: function() {
      this.titre = null;
      this.description = null;
      this.insulte = "va donc chier";
      this.estAjouterMerde = true;
    },
    annulerInsulte: function() {
      this.estAjouterMerde = false;
    },
    enregistrerInsulte: function() {
      if (this.validerFormulaire()) {
        Services.exec("Ip", {}).then(response => {
          var ip = response.data.clientIp;
          Services.exec("EnregistrerInsulte", {
            Ip: ip,
            Titre: this.titre.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ""),
            Description: (this.description + " " + this.insulte).replace(
              /(?:https?|ftp):\/\/[\n\S]+/g,
              ""
            )
          }).then(() => {
            this.estAjouterMerde = false;
            this.obtenirInsulte();
          });
        });
      }
    }
  },
  mounted() {
    this.obtenirInsulte();
  }
};
</script>
