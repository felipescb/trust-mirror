import io from 'socket.io-client';
import Script from './src/app';

const DEV = true;

const script = new Script();
if(DEV){
  const data = require('./assets/sample.json');
  handleData(data)
  document.onload = () => {
    script.setup(data);
    script.start();
  }
}
else{
  var socket = io.connect("http://localhost:3000/");
  socket.on("go", handleData);
}

function handleData(data){
  script.setup(data);
  script.start();
}