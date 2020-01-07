import repository from "./repository";
import queryString from "querystring";
export default {
  obtenirUrl(service, data) {
    var url = service + "/";
    for (var nomPropriete in data) {
      if (data[nomPropriete] != "") {
        url +=
          "&" + nomPropriete + "=" + encodeURIComponent(data[nomPropriete]);
      }
    }
    return url;
  },
  exec(nomService, data) {
    var url = this.obtenirUrl(nomService, data);
    return repository.get(url);
  },
  obtenirParametre(req, nomParametre) {
    var valeur = queryString.decode(req);
    return valeur[nomParametre];
  }
};
