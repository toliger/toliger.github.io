var damier;
var active_piece;

class Arene {
  constructor(image, taille) {
    this.taille = taille;
    this.pions = [];

    this.createRedTeam();
    this.createBlackTeam();
  }

  // On créer l'équipe des rouges
  createRedTeam() {
    for (let j = 1; j <= 3; j += 1) {
      for (let i = 0; i < this.taille.largeur.nb; i += 2) {
        if (j % 2) {
          this.pions.push(new PionRouge(2 + i, j, this.pions.length + 1, this));
        } else {
          this.pions.push(new PionRouge(1 + i, j, this.pions.length + 1, this));
        }
      }
    }
  }

  // On créer l'équipe des noires
  createBlackTeam() {
    for (let j = this.taille.hauteur.nb; j > this.taille.hauteur.nb - 3; j -= 1) {
      for (let i = 0; i < this.taille.largeur.nb; i += 2) {
        if (j % 2) {
          this.pions.push(new PionNoir(2 + i, j, this.pions.length + 1, this));
        } else {
          this.pions.push(new PionNoir(1 + i, j, this.pions.length + 1, this));
        }
      }
    }
  }
}


// Dès que la page est prête
$(() => {

  const dimension = Math.min($(window).width(), $(window).height());
  const cases = 8;
  const color = 'orange';

  new BuildArene(dimension, cases, color);

  damier = new Arene("", {
    hauteur: {
      px: dimension,
      nb: cases,
    },
    largeur: {
      px: dimension,
      nb: cases,
    },
  });
})