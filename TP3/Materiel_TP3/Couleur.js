class Couleur {
  constructor(red = 0, green = 0, blue = 0, transparent = 0) {
    this.r = new Component(red);
    this.g = new Component(green);
    this.b = new Component(blue);
    this.t = transparent;
    this.normaliser();
  }

  // Convertir la couleur en chaine de caractères
  toString() {
    return `(${this.r.value},${this.g.value},${this.b.value},${this.t})`;
  }

  // Multiplie la couleur par une constante
  coef(k) {
    this.r.coef(k);
    this.g.coef(k);
    this.b.coef(k);
  }

  // Fait la moyenne de la couleur
  intensite() {
    return (this.r.value + this.g.value + this.b.value) / 3;
  }

  // Tranforme la couleur en noir et blanc
  niveauGris() {
    const new_color = this.intensite();
    this.r.value = new_color;
    this.g.value = new_color;
    this.b.value = new_color;
  }

  // Seuil la couleur
  seuil(s) {
    if (this.intensite() > s) {
      this.r.value = 255;
      this.g.value = 255;
      this.b.value = 255;
    } else {
      this.r.value = 0;
      this.g.value = 0;
      this.b.value = 0;
    }
  }

  // Calcul le négatif de la couleur
  negate() {
    this.r.negate();
    this.g.negate();
    this.b.negate();
  }

  // Compare la couleur à la couleur entrée en paramètre
  memeCouleurQue(c) {
    return (this.r.value == c.r.value && this.g.value == c.g.value && this.b.value == c.b.value);
  }

  // Permuter Une composante
  permuteComposante(comp1, comp2) {
    let buffer;
    switch (comp1) {
      case 'r':
        {
          switch (comp2) {
            case 'g':
              {
                buffer = this.r;
                this.r = this.g;
                this.g = buffer;
                break;
              }
            case 'b':
              {
                buffer = this.r;
                this.r = this.b;
                this.b = buffer;
                break;
              }
          }
          break;
        }

      case 'g':
        {
          switch (comp2) {
            case 'r':
              {
                buffer = this.g;
                this.g = this.r;
                this.r = buffer;
                break;
              }

            case 'b':
              {
                buffer = this.g;
                this.g = this.b;
                this.b = buffer;
                break;
              }
          }
          break;
        }
      case 'b':
        {
          switch (comp2) {
            case 'r':
              {
                buffer = this.b;
                this.b = this.r;
                this.r = buffer;
                break;
              }

            case 'g':
              {
                buffer = this.b;
                this.b = this.g;
                this.g = buffer;
                break;
              }
          }
          break;
        }
    }
  }

  // Ajouter une couleur
  ajouteCouleurPonderee(c, coef) {
    c.r.coef(coef);
    c.g.coef(coef);
    c.b.coef(coef);
    this.r.value += c.r.value;
    this.g.value += c.g.value;
    this.b.value += c.b.value;
    this.r.reguler();
    this.g.reguler();
    this.b.reguler();
  }

  // Normaliser une couleur
  normaliser() {
    this.r.reguler();
    this.g.reguler();
    this.b.reguler();

    if(this.t > 255) {
      this.t = 255;
    } else if (this.t < 0){
      this.t = 0;
    }
  }

  // Definir la transparence
  set_trans(value){
    if (value > 255) {
      this.t = 255;
    } else if (value < 0){
      this.t = 0;
    } else {
      this.t = value;
    }
  }
}
