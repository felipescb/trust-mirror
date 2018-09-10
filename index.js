import io from 'socket.io-client';
import Journey from './src/app';

const DEV = true;

console.log('running');
if(DEV){
  const data = require('./assets/sample.json');
  const journey = new Journey(data);
  journey.play();
}
else{
  var socket = io.connect("http://localhost:3000/");
  socket.on("go", processData);
}