class Component {
  constructor(value) {
    this.value = value;
  }

  reguler() {
    if (this.value > 255) {
      this.value = 255;
    } else if (this.value < 0) {
      this.value = 0;
    }
  }

  coef(k) {
    this.value *= k;
    this.reguler();
  }

  negate() {
    this.value = 255 - this.value;
  }
}

class Couleur {
  constructor(red = 0, green = 0, blue = 0, transparent = 0) {
    this.r = new Component(red);
    this.g = new Component(green);
    this.b = new Component(blue);
    this.t = transparent;
  }

  toString() {
    return `(${this.r.value},${this.g.value},${this.b.value},${this.t})`;
  }

  coef(k) {
    this.r.coef(k);
    this.g.coef(k);
    this.b.coef(k);
  }

  intensite() {
    return (this.r.value + this.g.value + this.b.value) / 3;
  }

  niveauGris() {
    const new_color = this.intensite();
    this.r.value = new_color;
    this.g.value = new_color;
    this.b.value = new_color;
  }

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

  negate() {
    this.r.negate();
    this.g.negate();
    this.b.negate();
  }

  memeCouleurQue(c) {
    console.log(this.r.value);
    return (this.r.value == c.r.value && this.g.value == c.g.value && this.b.value == c.b.value);
  }

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
}

var couleur = new Couleur(10, 20, 30, 40);

let couleur2 = new Couleur(10, 20, 30, 40);

console.log(couleur.toString());
couleur.ajouteCouleurPonderee(couleur2, 9);
console.log(couleur.toString());