// alert('Hello World!!!');
console.log('Hello World!!!');


function getel(el) {
  return document.getElementById(el);
}

function getcoord(el) {
  return getel(el).getBoundingClientRect();
}

function printcoord(el) {
  console.log(el, getcoord(el));
}

function setz(el, n) {
  getel(el).style.zindex = n;
}

function printvisibility(el) {
  console.log(el + ' visibility: ', getel(el).style.visibility);
}




printcoord('im1');
printcoord('im2');

setz('im1', 1);
setz('im2', 2);

printcoord('im1');
printcoord('im2');

printvisibility('im1');
printvisibility('im2');
printvisibility('lebonbouton');



window.addEventListener('load', function(e) {
  console.log('chargement');
});

window.addEventListener('scroll', function(e) {
  console.log('scroll');
});

window.addEventListener('keypress', function(e) {
  console.log(e);
  console.log('clavier');
});

window.addEventListener('resize', function(e) {
  console.log('retailler');
});

getel('im1').addEventListener('click', function(e) {
  console.log('clique image');
});

getel('lebontexte').addEventListener('onmouseover', function(e) {
  console.log('souris sur texte');
});

setInterval(function() {
  console.log('up');
},1000);
