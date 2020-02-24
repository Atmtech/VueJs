var mongoose = require("mongoose");
Schema = mongoose.Schema;
connectionPool = require("./db.js").connectionPool;

var mediaSchema = new Schema(
  {
    NoMedia: String,
    DateCreation: Date,
    NoGroupe: String,
    Style: String,
    Etudiants: String,
    UrlMedia: String
  },
  { collection: "Media" }
);

exports.MediaFactory = function() {
  var conn = connectionPool.getConnection(
    "mongodb+srv://Tamere:10Crevette01@clustertamere-e1cpu.mongodb.net/MediaTwiggy?retryWrites=true",
    "MediaTwiggy"
  );
  var mongoosePaginate = require("mongoose-paginate-v2");
  mediaSchema.plugin(mongoosePaginate);
  return conn.model("medias", mediaSchema);
};
