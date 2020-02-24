var Media = require("../models/media").MediaFactory();

exports.ObtenirMedia = function(req, res) {
  Media.find({})
    .sort({ NoGroupe: "descending" })
    .exec(function(err, docs) {
      res.send(docs);
    });
};

exports.SauvegarderMedia = function(req, res) {
  const uuidv4 = require("uuid/v4");

  let media = new Media({
    NoMedia: uuidv4(),
    NoGroupe: req.body.NoGroupe,
    Style: req.body.Style,
    Etudiants: req.body.Etudiants,
    UrlMedia: req.body.UrlMedia
  });

  media.save(function(err, media) {
    res.send("OK");
  });
};

String.prototype.toObjectId = function() {
  var ObjectId = require("mongoose").Types.ObjectId;
  return new ObjectId(this.toString());
};

exports.SupprimerMedia = function(req, res) {
  Media.find({
    NoMedia: req.body.NoMedia
  })
    .deleteOne()
    .exec(function(err, docs) {
      Media.find({})
        .sort({ NoGroupe: "descending" })
        .exec(function(err, docs) {
          res.send(docs);
        });
    });
};
