var express = require('express');
var router = express.Router();

const controllerInsulte = './controllers/insulte'

router.get('/TestConnection', require(controllerInsulte).TestConnection);
router.get('/ObtenirNombrePageInsulte/:parametre', require(controllerInsulte).ObtenirNombrePageInsulte);

router.get('/ObtenirInsulteParPage/:parametre', require(controllerInsulte).ObtenirInsulteParPage);
router.get('/ObtenirInsulteParPageFiltre/:parametre', require(controllerInsulte).ObtenirInsulteParPageFiltre);
router.get('/ObtenirInsulte/:parametre', require(controllerInsulte).ObtenirInsulte);
router.get('/ObtenirTop10Insulte', require(controllerInsulte).ObtenirTop10Insulte);
router.get('/ObtenirTop10Localisation', require(controllerInsulte).ObtenirTop10Localisation);

router.get('/ObtenirNombrePageFiltre/:parametre', require(controllerInsulte).ObtenirNombrePageFiltre);
router.get('/EnregistrerInsulte/:parametre', require(controllerInsulte).EnregistrerInsulte);
router.get('/Jaime/:parametre', require(controllerInsulte).Jaime);
router.get('/Ip', require("./controllers/ip").Ip);

module.exports = router;





