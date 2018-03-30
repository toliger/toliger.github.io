class MonImage {
  constructor(largeur, hauteur) {
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.data = [];
  }

  // Importation d'une tableau de pixels
  fromImgData(data) {
    //this.data = data;
    for (let i = 0; i <= data.length - 4; i += 4) {
      this.data.push(new Couleur(data[i], data[i + 1], data[i + 2], data[i + 3]));
    }
  }

  // Exortation de l'image en tableau
  toImgData(data) {
    let count = 0;
    for (let i in this.data) {
      data[count] = this.data[i].r.value;
      data[count + 1] = this.data[i].g.value;
      data[count + 2] = this.data[i].b.value;
      data[count + 3] = this.data[i].t;
      count += 4;
    }
  }

  // Obtenir le pixel
  get(i, j) {
    return this.data[(i - 1) * this.largeur + j - 1];
  }

  // Modifier le pixel
  set(i, j, couleur) {
    this.data[(i - 1) * this.largeur + j - 1] = couleur;
  }

  // Afficher le pixel
  print(comp) {
    switch (comp) {
      case 'r':
        {
          break;
        }
      case 'g':
        {
          break;
        }
      case 'b':
        {
          break;
        }
    }


    for (let i in this.data) {
      console.log(`${i}(${ this.data[i].r.value } ${ this.data[i].g.value } ${ this.data[i].b.value } ${ this.data[i].t })`);
    }
  }

  // Negatif de l'image
  negate() {
    for (let i in this.data) {
      this.data[i].negate();
    }
  }

  // Multplier par un coefficient
  coef(k) {
    for (let i in this.data) {
      this.data[i].coef(k);
    }
  }

  // Transformer e noir et blanc
  niveauGris() {
    for (let i in this.data) {
      this.data[i].niveauGris();
    }
  }

  // Fait le seuil
  seuil(s) {
    for (let i in this.data) {
      this.data[i].seuil(s);
    }
  }

  // Permuter 2 composantes
  permuteComposante(comp1, comp2) {
    for (let i in this.data) {
      this.data[i].permuteComposante(comp1, comp2);
    }
  }

  // Effacer une partie de l'image
  effacerPartie(){
    for (let i in this.data) {
      this.data[i].set_trans(200);
    }
  }

 // Effacer le fond
 effacerFond(coul_fond) {
   for (let i in this.data) {
     if(this.data[i].memeCouleurQue(coul_fond)){
       this.data[i].set_trans(0);
     }
   }
 }

 // Fait la copie de l'image
 copie () {
   let res = new MonImage(this.largeur, this.hauteur);
   for(let e in this.data) {
     res.data.push(this.data[e]);
   }
   return res;
 }

 // Fait une convolution avec une matrice 3x3
 convPixel(noyau, copie) {
   for (let i = 1; i <= this.hauteur ; i++) {
     for (let j = 1; j <= this.largeur; j++) {
       let res = 0;
       let couleur = [0, 0, 0];
       for (let p = -1; p < 2; p++) {
         for (let m = -1; m < 2; m++) {
           let coords = [i + p, j + m];
           if (coords[0] > 0 && coords[0] < this.hauteur && coords[1] > 0 && coords[1] < this.largeur) {
             couleur[0] += copie.get(coords[0], coords[1]).r.value * noyau[1 + p][1 + m];
             couleur[1] += copie.get(coords[0], coords[1]).g.value * noyau[1 + p][1 + m];
             couleur[2] += copie.get(coords[0], coords[1]).b.value * noyau[1 + p][1 + m];
           }
         }
       }
       let coul_res = new Couleur(couleur[0], couleur[1], couleur[2], 255);
       this.set(i, j, coul_res);
     }
   }
 }

 // Fait une convolution avec une matrice 3x3 sur une coordonnée
 convPixelPourCommencer(noyau,m,n){
   let res = 0;
   for (let i = 0; i < 3; i++) {
     for (let j = 0; j < 3; j++) {
       if(!(m + i > this.largeur) && !(n + j > this.hauteur)) {
         res += this.get(m + i, n + j).coef(noyau[i,j]);
       }
     }
   }
   return res;
 }
}
