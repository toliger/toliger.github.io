class BuildArene{
  constructor(taille, dim, color){
    $('<canvas>').attr({
    id: 'canvas'
    }).css({
      width: taille + 'px',
      height: taille + 'px',
      position: 'absolute'
    }).appendTo('#arene');

    let box_size = taille / dim;
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.canvas.width = taille;
    ctx.canvas.height = taille;
    ctx.fillStyle = color;
    for(let i = 0; i < dim; i++){
      for(let j = 0; j < dim; j++){
        if(i % 2){
          ctx.fillRect(j * 2 * box_size, i * box_size, box_size, box_size);
        } else {
          ctx.fillRect(box_size + j * 2 * box_size, i * box_size, box_size, box_size);
        }

      }
    }
  }
}
