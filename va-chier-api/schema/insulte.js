var mongoose = require("mongoose");
var localisationSchema = require("./localisation")
var insulteSchema = new mongoose.Schema(
  {
    DateCreation: Date,
    Titre: String,
    Description: String,
    NombreJaime: Number,
    Localisation: localisationSchema
  },
  { collection: "Insulte" }
);
//module.exports = mongoose.model('Insulte', insulteSchema);
module.exports = insulteSchema;