class Piece {

  constructor(x, y, couleur = "rouge", id, damier) {

    this.arene = damier;
    // Init object
    this.id = id;


    new BuildPion(this.arene.taille.hauteur.px / this.arene.taille.hauteur.nb, couleur, id);

    // set color & position
    this.color = couleur;
    this.lgn = x;
    this.col = y;

    // add listeners
    $("#pion" + this.id).click((e) => {
      const re = /pion(\w+)/;
      var newstr = e.target.id.replace(re, "$1") - 1;
      damier.pions[newstr].activer();
    });
  }

  activer(){
    if(active_piece){
      $("#pion" + active_piece).removeClass('Pion_actif');
    }
    active_piece = this.id;
    $("#pion" + this.id).addClass('Pion_actif');
  }

  desactiver(){
    active_piece = null;
    $("#pion" + this.id).removeClass('Pion_actif');
  }

  set lgn(x) {
    this._lgn = x;
    $("#pion" + this.id).css('margin-left', (this._lgn - 1) * (this.arene.taille.largeur.px/ this.arene.taille.hauteur.nb));
  }

  set col(y) {
    this._col = y;
    $("#pion" + this.id).css('margin-top', (this.col - 1) * (this.arene.taille.largeur.px / this.arene.taille.largeur.nb));
  }

  get lgn() {
    return this._lgn;
  }

  get col() {
    return this._col;
  }

  set color(color) {
    this._color = color;
    switch (color) {
      case 'noir':
        {
          $("#pion" + this.id).removeClass('pionRouge');
          $("#pion" + this.id).addClass('pionNoir');
          break;
        }
      case 'rouge':
        {
          $("#pion" + this.id).removeClass('pionNoir');
          $("#pion" + this.id).addClass('pionRouge');
          break;
        }
    }
  }

  get color() {
    return this._color;
  }

  print() {
    console.log('x = ' + this.lgn + ', y = ' + this.col);
  };

  deplacer(direction) {
    new MyAudio('move', { color: this.color });
    switch (direction) {
      case 'haut':
        {
          if (this.col - 1 < 1) {
            new Error("bordure");
          } else {
            this.col -= 1;
          }
          break;
        }
      case 'gauche':
        {
          if (this.lgn - 1 < 1) {
            new Error("bordure");
          } else {
            this.lgn -= 1;
          }
          break;
        }
      case 'bas':
        {
          if (this.col + 1 > this.arene.taille.hauteur.nb) {
            new Error("bordure");
          } else {
            this.col += 1;
          }
          break;
        }
      case 'droite':
        {
          if (this.lgn + 1 > this.arene.taille.largeur.nb) {
            new Error("bordure");
          } else {
            this.lgn += 1;
          }
          break;
        }
    }
  };
}
