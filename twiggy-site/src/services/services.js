import queryString from "querystring";
import axios from "axios";
import config from "../config/config";
import moment from "moment";
// import SessionState from "./session";

export default {
  obtenirUrl(service, data) {
    var url = service + "/";
    for (var nomPropriete in data) {
      if (data[nomPropriete] != "") {
        url +=
          nomPropriete + "=" + encodeURIComponent(data[nomPropriete]) + "&";
      }
    }
    return url;
  },

  post(nomService, parametre, corps) {
    var url =
      config.api +
      "/" +
      this.obtenirUrl(nomService, parametre);
    // eslint-disable-next-line no-console
    //console.log(url);

    return axios.post(url, corps, {
      auth: {
        username: "tamere",
        password: "10tamere01"
      }
    });
  },

  exec(nomService, data) {
    const baseURL = config.api;
    
    var url = this.obtenirUrl(nomService, data);
    // eslint-disable-next-line no-console
    console.log(url);
    return axios.create({ baseURL }).get(url, {
      withCredentials: true,
      auth: {
        username: "tamere",
        password: "10tamere01"
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },
  obtenirParametre(req, nomParametre) {
    var valeur = queryString.decode(req);
    return valeur[nomParametre];
  },

  formatDate: function(date) {
    if (date == null) return "";
    if (date == "") return "";
    date = moment(date).format("YYYY-MM-DD");
    return date.toString().indexOf("1900") >= 0 ? "" : date.substring(0, 10);
  },

};
