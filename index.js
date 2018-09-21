import io from 'socket.io-client';
import Script from './src/script';

const DEV = 1;

const script = new Script();
const url = "http://app.cached.id/";
var socket = io.connect(url);

if(DEV){
  const data = require('./src/sample.json');
  // beDone(data)
  handleData(data, beDone)
  document.onload = () => {
    script.setup(data, beDone);
    script.start();
  }
}
else{
  socket.on("go", ({ data }) => handleData(data, beDone));
}

function beDone(data){
  console.log('Printing!', data)
  fetch('http://localhost:3001/', {
    method: 'POST',
    body: JSON.stringify(data),
    // needed to allow cross origin request. Response cannot however not be read
    mode: 'no-cors',
  });
  location.reload();
  globalAudio.stop();
}

function handleData(data, onEnd){
  var globalAudio = new Audio('/assets/audio/trust.mp3');
  globalAudio.play();
  script.setup(data, onEnd);
  script.start();
}