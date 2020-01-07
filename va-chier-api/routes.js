var express = require('express');
var router = express.Router();

router.get('/Test', require('./controllers/Test').Test);
router.get('/ObtenirInsulteParPage/:parametre', require('./controllers/Insulte').ObtenirInsulteParPage);
router.get('/ObtenirInsulte/:parametre', require('./controllers/Insulte').ObtenirInsulte);
router.get('/ObtenirTop10Insulte', require('./controllers/Insulte').ObtenirTop10Insulte);
router.get('/ObtenirTop10Localisation', require('./controllers/Insulte').ObtenirTop10Localisation);
router.get('/ObtenirNombrePageInsulte/:parametre', require('./controllers/Insulte').ObtenirNombrePageInsulte);
router.get('/EnregistrerInsulte/:parametre', require('./controllers/Insulte').EnregistrerInsulte);
router.get('/Jaime/:parametre', require('./controllers/Insulte').Jaime);


module.exports = router;




