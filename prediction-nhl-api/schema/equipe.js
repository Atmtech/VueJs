class Equipe {
    constructor(propriete) {
      this.id = propriete.id;
      this.nom = propriete.nom;
      this.matchJoue = propriete.matchJoue;
      this.position = propriete.position;
      this.gagne = propriete.gagne;
      this.perdu = propriete.perdu;
      this.points = propriete.points;
      this.butCompte = propriete.butCompte;
      this.butContre = propriete.butContre;
      this.streak = propriete.streak;
      this.logo = propriete.logo;
    }
  }
  module.exports = Equipe;
  