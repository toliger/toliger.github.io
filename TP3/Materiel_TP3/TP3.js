window.onload = function() {
  //-------- creation d'un élément image --------
  var img = document.createElement("img");
  img.src = "anna.png";
  document.body.appendChild(img);
  var largeur = Math.floor(img.naturalWidth); // On récupère la largeur
  var hauteur = Math.floor(img.naturalHeight); // et la hauteur de l'image

  //-------- creation d'un élément canvas --------
  var canv = document.createElement("canvas");
  canv.width = largeur;
  canv.height = hauteur;
  document.body.appendChild(canv);

  //-------- récupération du contexte  --------
  var ctxt = canv.getContext('2d');

  //------- chargement de l'image de départ dans le canvas -----
  ctxt.drawImage(img, 0, 0);
  var imgData = ctxt.getImageData(0, 0, largeur, hauteur);

  //--------------------------------------------------
  //------------- Traitement de imgData --------------
  //--------------------------------------------------



  //---- afficher la tailles ----
  console.log(imgData.width + " x " + imgData.height);

  //---- afficher les pixels ---
  var buffer = "";
  for (var n = 0; n < imgData.data.length; n++) {
    buffer = buffer + imgData.data[n] + " ";
  }


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

  class MonImage {
    constructor(largeur, hauteur) {
      this.largeur = largeur;
      this.hauteur = hauteur;
      this.data = [];
    }

    fromImgData(data) {
      //this.data = data;
      for (let i = 0; i <= data.length - 4; i += 4) {
        this.data.push(new Couleur(data[i], data[i + 1], data[i + 2], data[i + 3]));
      }
    }

    toImgData(data) {
      let count = 0;
      for (let i = 0; i < this.data.length; i++) {
        data[count] = this.data[i].r.value;
        data[count + 1] = this.data[i].g.value;
        data[count + 2] = this.data[i].b.value;
        data[count + 3] = this.data[i].t;
        count += 4;
      }
    }

    get(i, j) {
      return this.data[(i - 1) * this.largeur + j - 1];
    }

    set(i, j, couleur) {
      this.data[(i - 1) * this.largeur + j - 1] = couleur;
    }

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



      for (let i = 0; i < this.data.length; i++) {
        console.log(`${i}(${
              this.data[i].r.value
            } ${
              this.data[i].g.value
            } ${
              this.data[i].b.value
            } ${
              this.data[i].t
            })
          `);
      }
    }

    negate() {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].negate();
      }
    }

    coef(k) {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].coef(k);
      }
    }

    niveauGris() {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].niveauGris();
      }
    }

    seuil(s) {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].seuil(s);
      }
    }

    permuteComposante(comp1, comp2) {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].permuteComposante(comp1, comp2);
      }
    }
  }

  let imgp = new MonImage(5, 5);
  imgp.fromImgData(imgData.data);

  var blanc = new Couleur(255, 255, 255); // créer une couleur blanche
  imgp.negate();
  imgp.toImgData(imgData.data);

  // rendu bugger

  //--------------------------------------------------
  //------------- Fin des Traitements ----------------
  //--------------------------------------------------

  // visualiser imgData modifié
  ctxt.putImageData(imgData, 0, 0);
}