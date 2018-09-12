import io from 'socket.io-client';
import Script from './src/app';

const DEV = true;

const script = new Script();
if(DEV){
  const data = require('./src/sample.json');
  handleData(data)
  document.onload = () => {
    script.setup(data);
    script.start();
  }
}
else{
  const url = "http://app.cached.id/";
  var socket = io.connect(url);
  window.socket = socket;
  socket.on("go", (data) => handleData(data, () => {
    fetch('http://localhost:3000/print', {
      method: 'post',
      body: JSON.stringify(data),
    });
  }));
}

function handleData(data, onEnd){
  script.setup(data, onEnd);
  script.start();
}