var express = require("express");
var router = express.Router();

router.get('/ping', require("./controllers/ping.js").ping);
router.get('/ObtenirMedia', require("./controllers/media.js").ObtenirMedia);
router.post('/SauvegarderMedia', require("./controllers/media.js").SauvegarderMedia);
router.post('/SupprimerMedia', require("./controllers/media.js").SupprimerMedia);

module.exports = router;




