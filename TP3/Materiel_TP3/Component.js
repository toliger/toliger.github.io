// Composant bleu, verte ou rouge
class Component {
  constructor(value) {
    this.value = value;
  }

  // Reguler la couleur
  reguler() {
    if (this.value > 255) {
      this.value = 255;
    } else if (this.value < 0) {
      this.value = 0;
    }
  }

  // Multiplier le composant par un coefficient
  coef(k) {
    this.value *= k;
    this.reguler();
  }

  // Inverser la composante
  negate() {
    this.value = 255 - this.value;
  }
}
