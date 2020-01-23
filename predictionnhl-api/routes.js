var express = require('express');
var router = express.Router();

const controllerPrediction = './controllers/predictionNHL.js'
const controllerAuthentification = './controllers/authentification.js'

router.get('/ObtenirStanding/:parametre', require(controllerPrediction).ObtenirStanding);
router.get('/ObtenirClassement/:parametre', require(controllerPrediction).ObtenirClassement);
router.get('/ObtenirGame/:parametre', require(controllerPrediction).ObtenirGame);
router.get('/ObtenirPrediction/:parametre', require(controllerPrediction).ObtenirPrediction);
router.get('/EnregistrerPrediction/:parametre', require(controllerPrediction).EnregistrerPrediction);
router.get('/ObtenirListeDatePrediction', require(controllerPrediction).ObtenirListeDatePrediction);

router.get('/Authentification/:parametre', require(controllerAuthentification).Authentification);



module.exports = router;






