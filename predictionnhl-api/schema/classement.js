class Classement {
  constructor(propriete) {
    this.nom = propriete.nom;
    this.prenom = propriete.prenom;
    this.courriel = propriete.courriel;
    this.pointage = propriete.pointage;
    this.nombrePointageCorrect = propriete.nombrePointageCorrect;
    this.nombreVictoire = propriete.nombreVictoire;
    this.nombreEchec = propriete.nombreEchec;
    this.nombreTotalPrediction = propriete.nombreTotalPrediction;
  }
}
module.exports = Classement;
