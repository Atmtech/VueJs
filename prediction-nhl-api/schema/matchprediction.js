class MatchPrediction {
  constructor(propriete) {
    this.utilisateur = propriete.utilisateur;
    this.gamePk = propriete.gamePk;
    this.heure = propriete.heure;
    this.arena = propriete.arena;
    this.equipeVisiteur = propriete.equipeVisiteur;
    this.equipeLocal = propriete.equipeLocal;
    this.pointageVisiteur = propriete.pointageVisiteur;
    this.pointageLocal = propriete.pointageLocal
    this.pointagePredictionVisiteur = propriete.pointagePredictionVisiteur;
    this.pointagePredictionLocal = propriete.pointagePredictionLocal;
    this.estPredictionGagnante = propriete.estPredictionGagnante;
    this.estPointagePredictionExacte = propriete.estPointagePredictionExacte;
    this.autrePrediction = propriete.autrePrediction;
    
  }
}
module.exports = MatchPrediction;
