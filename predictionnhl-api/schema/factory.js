var mongoose = require("mongoose");
Schema = mongoose.Schema;
connectionPool = require("./db.js").connectionPool;

var utilisateurSchema = new Schema({
  Nom: String,
  Prenom: String,
  Courriel: String,
  MotPasse: String,
  EstAdministrateur: String},
  { collection: "Utilisateur" }
);

var predictionSchema = new Schema(
  {
    GamePrimaryKey: String,
    Utilisateur: utilisateurSchema,
    PointageLocal: Number,
    PointageVisiteur: Number
  },
  { collection: "Prediction" }
);

const connectionProduction =
  "mongodb+srv://Tamere:10Crevette01@clustertamere-e1cpu.mongodb.net/PredictionNHL?retryWrites=true&w=majority";
const connectionLocal = 
  "mongodb://localhost:27017/PredictionNHL?retryWrites=true&w=majority";

exports.PredictionFactory = function() {
  var conn = connectionPool.getConnection(
    //connectionProduction,
     connectionLocal,
    "PredictionNHL"
  );
  var mongoosePaginate = require("mongoose-paginate-v2");
  predictionSchema.plugin(mongoosePaginate);
  return conn.model("predictions", predictionSchema);
};

exports.UtilisateurFactory = function() {
  var conn = connectionPool.getConnection(
    //connectionProduction,
     connectionLocal,
    "PredictionNHL"
  );
  var mongoosePaginate = require("mongoose-paginate-v2");
  utilisateurSchema.plugin(mongoosePaginate);
  return conn.model("utilisateurs", utilisateurSchema);
};
