var express = require('express');
var router = express.Router();

const controllerPrediction = './controllers/predictionNHL.js'
const controllerAuthentification = './controllers/authentification.js'

router.get('/ObtenirStanding/:parametre', require(controllerPrediction).ObtenirStanding);
router.get('/ObtenirToutesPrediction/:parametre', require(controllerPrediction).ObtenirToutesPrediction);
router.get('/ObtenirClassement/:parametre', require(controllerPrediction).ObtenirClassement);
router.get('/ObtenirGame/:parametre', require(controllerPrediction).ObtenirGame);
router.get('/ObtenirPrediction/:parametre', require(controllerPrediction).ObtenirPrediction);
router.get('/EnregistrerPrediction/:parametre', require(controllerPrediction).EnregistrerPrediction);
router.get('/ObtenirListeDatePrediction/:parametre', require(controllerPrediction).ObtenirListeDatePrediction);

router.get('/Authentification/:parametre', require(controllerAuthentification).Authentification);



module.exports = router;






