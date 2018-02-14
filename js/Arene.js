var damier;
var active_piece;

class Arene {
  constructor(image, taille) {
    this.taille = taille;
    this.pions = [];

    this.createRedTeam();
    this.createBlackTeam();
  }

  createRedTeam() {
    this.pions.push(new PionRouge(2, 1, this.pions.length + 1, this));
    this.pions.push(new PionRouge(4, 1, this.pions.length + 1, this));
    this.pions.push(new PionRouge(6, 1, this.pions.length + 1, this));
    this.pions.push(new PionRouge(8, 1, this.pions.length + 1, this));

    this.pions.push(new PionRouge(1, 2, this.pions.length + 1, this));
    this.pions.push(new PionRouge(3, 2, this.pions.length + 1, this));
    this.pions.push(new PionRouge(5, 2, this.pions.length + 1, this));
    this.pions.push(new PionRouge(7, 2, this.pions.length + 1, this));

    this.pions.push(new PionRouge(2, 3, this.pions.length + 1, this));
    this.pions.push(new PionRouge(4, 3, this.pions.length + 1, this));
    this.pions.push(new PionRouge(6, 3, this.pions.length + 1, this));
    this.pions.push(new PionRouge(8, 3, this.pions.length + 1, this));
  }

  createBlackTeam() {
    this.pions.push(new PionNoir(1, 6, this.pions.length + 1, this));
    this.pions.push(new PionNoir(3, 6, this.pions.length + 1, this));
    this.pions.push(new PionNoir(5, 6, this.pions.length + 1, this));
    this.pions.push(new PionNoir(7, 6, this.pions.length + 1, this));

    this.pions.push(new PionNoir(2, 7, this.pions.length + 1, this));
    this.pions.push(new PionNoir(4, 7, this.pions.length + 1, this));
    this.pions.push(new PionNoir(6, 7, this.pions.length + 1, this));
    this.pions.push(new PionNoir(8, 7, this.pions.length + 1, this));

    this.pions.push(new PionNoir(1, 8, this.pions.length + 1, this));
    this.pions.push(new PionNoir(3, 8, this.pions.length + 1, this));
    this.pions.push(new PionNoir(5, 8, this.pions.length + 1, this));
    this.pions.push(new PionNoir(7, 8, this.pions.length + 1, this));
  }

};



$(() => {
  damier = new Arene("", {
    hauteur: {
      px: 1024,
      nb: 8,
    },
    largeur: {
      px: 1024,
      nb: 8,
    },
  });
})
