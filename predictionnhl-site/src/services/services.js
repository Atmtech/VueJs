import repository from "./repository";
import queryString from "querystring";
export default {
  obtenirUrl(service,store, data) {
    var url = service + "/";
    for (var nomPropriete in data) {
      if (data[nomPropriete] != "") {
        url +=
          "&" + nomPropriete + "=" + encodeURIComponent(data[nomPropriete]);
      }
    }
    return url;
  },
  exec(nomService,store, data) {
    var url = this.obtenirUrl(nomService,store, data);

    return repository.get(
      url,
      {
        withCredentials: true,
        auth: {
          username: "tamere",
          password: "10tamere01"
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  },
  obtenirParametre(req, nomParametre) {
    var valeur = queryString.decode(req);
    return valeur[nomParametre];
  }
};
