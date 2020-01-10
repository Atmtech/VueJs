var mongoose = require("mongoose");
Schema = mongoose.Schema;
connectionPool = require("./db.js").connectionPool;

var localisationSchema = new Schema({
  Ip: String,
  Pays: String,
  Region: String,
  Ville: String,
  Latitude: String,
  Longitude: String
});

var insulteSchema = new Schema(
  {
    DateCreation: Date,
    Titre: String,
    Description: String,
    NombreJaime: Number,
    Localisation: localisationSchema
  },
  { collection: "Insulte" }
);

exports.InsulteFactory = function() {
  var conn = connectionPool.getConnection(
    "mongodb+srv://Tamere:10Crevette01@clustertamere-e1cpu.mongodb.net/Vachier?retryWrites=true&w=majority",
    "Vachier"
  );
  var mongoosePaginate = require("mongoose-paginate-v2");
  insulteSchema.plugin(mongoosePaginate);
  return conn.model("insultes", insulteSchema);
};
