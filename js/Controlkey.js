$(document).keypress((e) => {
  if(active_piece){
    switch(e.originalEvent.key){
      case 'z': {
        damier.pions[active_piece - 1].deplacer('haut');
        break;
      }

      case 'q': {
        damier.pions[active_piece - 1].deplacer('gauche');
        break;
      }

      case 's': {
        damier.pions[active_piece - 1].deplacer('bas');
        break;
      }

      case 'd': {
        damier.pions[active_piece - 1].deplacer('droite');
        break;
      }
    }
  }
});
