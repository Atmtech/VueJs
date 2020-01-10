var queryString = require("../queryString");
const axios = require("axios");
var Insulte = require("../schema/insulte").InsulteFactory();

exports.TestConnection = function(req, res) {
  const nombreInsulte = 10;
  Insulte.find({})
    .sort({ NombreJaime: "descending" })
    .exec(function(err, docs) {
      var retour = [];
      for (let index = 0; index < nombreInsulte; index++) {
        retour.push(docs[index]);
      }
      res.send(retour);
    });
};

exports.ObtenirNombrePageInsulte = function(req, res) {
  var nombreParPage = queryString.ObtenirNombreParPage(req);
  const options = {
    page: 1,
    limit: nombreParPage,
    collation: {
      locale: "en"
    }
  };

  Insulte.paginate({}, options, function(err, result) {
    res.send(result.totalPages.toString());
  });
};

exports.ObtenirNombrePageFiltre = function(req, res) {
  var filtre = queryString.ObtenirFiltre(req);
  var nombreParPage = queryString.ObtenirNombreParPage(req);
  const options = {
    page: 1,
    limit: nombreParPage,
    collation: {
      locale: "en"
    }
  };
  Insulte.paginate({ Description: { $regex: filtre } }, options, function(
    err,
    result
  ) {
    res.send(result.totalPages.toString());
  });
};

exports.ObtenirInsulteParPageFiltre = function(req, res) {
  var page = queryString.ObtenirPage(req);
  var filtre = queryString.ObtenirFiltre(req);
  var nombreParPage = queryString.ObtenirNombreParPage(req);

  const options = {
    page: page,
    limit: nombreParPage,
    collation: {
      locale: "en"
    }
  };
  Insulte.paginate({ Description: { $regex: filtre } }, options, function(
    err,
    result
  ) {
    res.send(result.docs);
  });
};

exports.ObtenirInsulteParPage = function(req, res) {
  var page = queryString.ObtenirPage(req);
  var nombreParPage = queryString.ObtenirNombreParPage(req);
  const options = {
    page: page,
    limit: nombreParPage,
    collation: {
      locale: "en"
    }
  };
  Insulte.paginate({}, options, function(err, result) {
    res.send(result.docs);
  });
};

exports.ObtenirTop10Insulte = function(req, res) {
  const nombreInsulte = 10;
  Insulte.find({})
    .sort({ NombreJaime: "descending" })
    .exec(function(err, docs) {
      var retour = [];
      for (let index = 0; index < nombreInsulte; index++) {
        if (docs[index] != null)
          retour.push(docs[index]);
      }
      res.send(retour);
    });
};

exports.ObtenirTop10Localisation = function(req, res) {
  const aggregatorOpts = [
    {
      $unwind: "$Localisation"
    },
    {
      $group: {
        _id: { pays: "$Localisation.Pays", ville: "$Localisation.Ville" },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ];

  Insulte.aggregate(aggregatorOpts).exec(function(err, docs) {
    res.send(docs);
  });
};

exports.EnregistrerInsulte = function(req, res) {
  var ip = queryString.ObtenirIp(req);
  var description = queryString.ObtenirDescription(req);
  var titre = queryString.ObtenirTitre(req);

  axios.get("https://ipapi.co/" + ip + "/json/").then(function(response) {
    var insultation = new Insulte({
      DateCreation: Date.now(),
      Titre: titre,
      Description: description,
      NombreJaime: 0,
      Localisation: {
        Ip: ip,
        Pays: response.data.country_name,
        Region: response.data.region,
        Ville: response.data.city,
        Latitude: response.data.latitude,
        Longitude: response.data.longitude
      }
    });

    insultation.save(function(err, insultation) {
      res.send("OK");
    });
  });
};

exports.ObtenirInsulte = function(req, res) {
  var idInsulte = queryString.ObtenirIdInsulte(req);
  Insulte.findOne({ _id: idInsulte }, function(err, doc) {
    res.send(doc);
  });
};

exports.Jaime = function(req, res) {
  var idInsulte = queryString.ObtenirIdInsulte(req);
  Insulte.findOne({ _id: idInsulte }, function(err, doc) {
    doc.NombreJaime = doc.NombreJaime + 1;
    doc.save();
    res.send("OK");
  });
};
