$(() => {
  // consignes
  var consignes = document.createElement('p');
  consignes.setAttribute("id", "letexte");
  $('#app').append(consignes);

  $('#letexte').html('Z Q S D to move ou , A O E pour les clavier dvorak');

  $('#leboutton').html('Damier : on/off');
  $('#leboutton').click(() => {
    damierOnOff();
  });

  // damier
  var damier = document.createElement('div');
  damier.setAttribute("id", "arene");
  $('#app').append(damier);

});
