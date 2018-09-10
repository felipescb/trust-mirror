import io from 'socket.io-client';
import Journey from './src/app';

const DEV = true;

const journey = new Journey();
if(DEV){
  const data = require('./assets/sample.json');
  handleData(data)
  document.onload = () => {
    journey.setup(data);
    journey.start();
  }
}
else{
  var socket = io.connect("http://localhost:3000/");
  socket.on("go", handleData);
}

function handleData(data){
  journey.setup(data);
  journey.start();
}