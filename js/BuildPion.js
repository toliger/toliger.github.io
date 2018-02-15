class BuildPion{
  constructor(taille, color, id){

    $('<canvas>').attr({
    id: 'pion' + id
    }).css({
      width: taille + 'px',
      height: taille + 'px',
      position: 'absolute'
    }).appendTo('#arene');

    var c = document.getElementById("pion" + id);
    var ctx = c.getContext("2d");

    ctx.canvas.width = taille;
    ctx.canvas.height = taille;

    const centre = taille / 2;
    let rayon = (taille / 2) * 0.8;

    for(let i = 0; i < 4; i++){
      rayon *= 0.80;
      ctx.arc(centre, centre, rayon, 0, 2 * Math.PI, false);
    }
    let canvas_color;
    let border_color;
    switch(color){
      case 'rouge': {
        canvas_color = 'red';
        border_color = '#f45f42';
        break;
      }
      case 'noir': {
        canvas_color = '#56403c';
        border_color = '#f45f4';
        break;
      }
      default: {
        canvas_color = 'green';
        border_color = 'yellow';
        break;
      }
    }
    ctx.fillStyle = canvas_color;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = border_color;
    ctx.stroke();


  }
}
