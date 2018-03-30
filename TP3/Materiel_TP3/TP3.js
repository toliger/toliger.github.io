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


  function tab3x3(a, b, c, d, e, f, g, h, i) {
    let tab = [];
    tab.push([a, b, c],[d, e, f], [g, h, i]);
    return tab;
  }

  var lebontab = tab3x3(0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11);


  let imgp = new MonImage(imgData.width, imgData.height);
  imgp.fromImgData(imgData.data);

  const fond = new Couleur(66,93,164, 255);
  var blanc = new Couleur(255, 255, 255); // créer une couleur blanche

  let copie = imgp.copie();
  copie.fromImgData(imgData.data);

  imgp.convPixel(lebontab, copie);

  imgp.toImgData(imgData.data);

  // rendu bugger

  //--------------------------------------------------
  //------------- Fin des Traitements ----------------
  //--------------------------------------------------

  // visualiser imgData modifié
  ctxt.putImageData(imgData, 0, 0);
}
