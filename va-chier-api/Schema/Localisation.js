var mongoose = require("mongoose");
var localisationSchema = new mongoose.Schema(
  {
    Ip: String,
    Pays: String,
    Region: String,
    Ville: String,
    Latitude:String,
    Longitude:String,
  }
);
//module.exports = mongoose.model('Insulte', insulteSchema);
module.exports = localisationSchema;