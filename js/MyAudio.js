class MyAudio{
  constructor(event, data){
    let audio = new Audio('./SonsImages/rouge.mp3');
    console.log(data);
    switch (event) {
      case 'move': {
        switch (data.color) {
          case 'rouge': {
            audio = new Audio('./SonsImages/rouge.mp3');
            break;
          }

          case 'noir': {
            audio = new Audio('./SonsImages/noir.mp3');
            break;
          }
        }
      }
      break;
    }
    audio.play();
  }
}
