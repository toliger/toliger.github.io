var pion_rouge = {
  x: 3,
  y: 6
};
var pion_noir = {
  x: 5,
  y: 4
};


// Par défault le pion actif et le rouge
var pion_actif = 'pionRouge';

// hide / show le damier
function damierOnOff() {
  var damier = document.getElementById('damier');
  if (damier.style.visibility === '' || damier.style.visibility === 'visible') {
    damier.style.visibility = 'hidden';
  } else {
    damier.style.visibility = 'visible';
  }
}

function getmargin(pion, direction) {
  switch (direction) {
    case 'top':
      {
        return Number(document.getElementById(pion).style.marginTop.slice(0, -2));
        break;
      }
    case 'left':
      {
        return Number(document.getElementById(pion).style.marginLeft.slice(0, -2));
        break;
      }
  }
}

function getelement(pion) {
  return document.getElementById(pion);
}

function updatePos(pion, direction) {
  switch (direction) {
    case 'haut':
      {
        if (pion === "pionRouge") {
          pion_rouge.y += 1;
        } else {
          pion_noir.y += 1;
        }
        break;
      }
    case 'gauche':
      {
        if (pion === "pionRouge") {
          pion_rouge.x -= 1;
        } else {
          pion_noir.x -= 1;
        }
        break;
      }
    case 'bas':
      {
        if (pion === "pionRouge") {
          pion_rouge.y -= 1;
        } else {
          pion_noir.y -= 1;
        }
        break;
      }
    case 'droite':
      {
        if (pion === "pionRouge") {
          pion_rouge.x += 1;
        } else {
          pion_noir.x += 1;
        }
        break;
      }
  }
}

var last_conflict = false;


// recherche les collisions
function checkConflict() {
  if (last_conflict) {
    getelement('pionRouge').style.transform = '';
    last_conflict = false;
  }

  if (pion_noir.x == pion_rouge.x && pion_noir.y == pion_rouge.y) {
    last_conflict = true;
    getelement('pionRouge').style.transform = 'scale(1.5)';
  }
}

// bruit quand on se déplace
function play_sound(pion) {
  if (pion == 'pionRouge') {
    var audio = new Audio('./SonsImages/rouge.mp3');
    audio.play();
  } else {
    var audio = new Audio('./SonsImages/noir.mp3');
    audio.play();
  }
}


// si on essaye de sortir du damier
function play_stop() {
  var audio = new Audio('./SonsImages/stop.mp3');
  audio.play();
}

function deplacer(pion, direction) {
  switch (direction) {
    case 'haut':
      {
        var new_position = getmargin(pion, 'top') - 128;
        if (new_position >= 0) {
          getelement(pion).style.marginTop = new_position;
          updatePos(pion, direction);
          checkConflict();
          play_sound(pion);
        } else {
          play_stop();
        }
        break;
      }

    case 'bas':
      {
        var new_position = getmargin(pion, 'top') + 128;
        if (new_position < 1024) {
          getelement(pion).style.marginTop = new_position;
          updatePos(pion, direction);
          checkConflict();
          play_sound(pion);
        } else {
          play_stop();
        }
        break;
      }

    case 'droite':
      {
        var new_position = getmargin(pion, 'left') + 128;
        if (new_position < 1024) {
          getelement(pion).style.marginLeft = new_position;
          updatePos(pion, direction);
          checkConflict();
          play_sound(pion);
        } else {
          play_stop();
        }
        break;
      }

    case 'gauche':
      {
        var new_position = getmargin(pion, 'left') - 128;
        if (new_position >= 0) {
          getelement(pion).style.marginLeft = new_position;
          updatePos(pion, direction);
          checkConflict();
          play_sound(pion);
        } else {
          play_stop();
        }
        break;
      }

  }
}

// Secret combinaison
var touche_buffer = ['', '', ''];

function secret_function(l) {
  touche_buffer.push(l);
  touche_buffer.shift();
  if (touche_buffer[0] == 'b' && touche_buffer[1] == 'o' && touche_buffer[2] == 'b') {
    var audio = new Audio('./SonsImages/bob.mp3');
    audio.play();
  }
}


// Sous mac les fleches ne fonctionnent pas, du coup j'ai choisis ZQSD et le support aux claviers dvorak
window.addEventListener('keypress', function(e) {
  secret_function(e.key);
  switch (e.key) {
    case ',':
    case 'z':
      {
        deplacer(pion_actif, 'haut');
        break;
      }
    case 'a':
    case 'q':
      {
        deplacer(pion_actif, 'gauche');
        break;
      }
    case 'o':
    case 's':
      {
        deplacer(pion_actif, 'bas');
        break;
      }
    case 'e':
    case 'd':
      {
        deplacer(pion_actif, 'droite');
        break;
      }
  }
});

// rend un pion actif
function pionActif(pion) {
  if (pion == 'pionRouge') {
    getelement('pionRouge').style.zIndex = 3;
    pion_actif = 'pionRouge';
  } else {
    getelement('pionRouge').style.zIndex = 1;
    pion_actif = 'pionNoir';
  }
}

// Met actif les pions quand on clique dessus
$(() => {
  $('#pionRouge').click(() => {
    pionActif('pionRouge');
  });

  $('#pionNoir').click(() => {
    pionActif('pionNoir');
  });
});