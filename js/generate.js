$(() => {

  $('#leboutton').html('Damier : on/off');
  $('#leboutton').click(() => {
    damierOnOff();
  });

  // damier
  var damier = document.createElement('div');
  damier.setAttribute("id", "arene");
  $('#app').append(damier);

});