import io from 'socket.io-client';
import Script from './src/script';

const DEV = false;

const script = new Script();
const url = "http://app.cached.id/";
var socket = io.connect(url);
if(DEV){
  const data = require('./src/sample.json');
  handleData(data, beDone)
  document.onload = () => {
    script.setup(data, beDone);
    script.start();
  }
}
else{
  socket.on("go", (data) => handleData(data, beDone));
}

function beDone(data){
  console.log('Printing!')
  fetch('http://localhost:3001/', {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'no-cors',
  });
}
function handleData(data, onEnd){
  script.setup(data, onEnd);
  script.start();
}