class BuildArene{
  constructor(taille, dim, color){
    $('<canvas>').attr({
    id: 'arene'
    }).css({
      width: taille + 'px',
      height: taille + 'px'
    }).appendTo('#app');

    let box_size = taille / dim;
    console.log(box_size);
    var c = document.getElementById("arene");
    var ctx = c.getContext("2d");
    ctx.canvas.width = taille;
    ctx.canvas.height = taille;
    ctx.fillStyle = color;
    for(let i = 0; i < dim; i++){
      for(let j = 0; j < dim; j++){
        if(i % 2){
          ctx.fillRect(j * 2 * box_size, i * box_size, 128, 128);
        } else {
          ctx.fillRect(128 + j * 2 * box_size, i * box_size, 128, 128);
        }

      }
    }
  }
}

new BuildArene(1024, 8, 'blue');
