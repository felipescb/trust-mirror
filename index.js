import io from 'socket.io-client';
import Script from './src/script';

const DEV = 1;

const script = new Script();
const url = "http://app.cached.id/";
var socket = io.connect(url);

if(DEV) {
    const urlParams = new URLSearchParams(window.location.search);
    const sesionParam = urlParams.get('s');
    const dataLocale = 'http://localhost:3000/to_mirror/' + sesionParam + '.json';

    fetch(dataLocale, {method: 'GET',})
        .then((j) => {
            return j.json();
        })
        .then((data) => {
            console.log(data);
            handleData(data, beDone)
            document.onload = () => {
                script.setup(data, beDone);
                script.start();
            }
        })
} else{
  socket.on("go", ({ data }) => handleData(data, beDone));
}

function beDone(data){
  console.log('Printing!', data)
  fetch('http://localhost:3001/', {
    method: 'POST',
    body: JSON.stringify(data),
    // needed to allow cross origin request. Response cannot however not be read
    mode: 'no-cors',
  }).then((res) => {
    console.log('after print')
    location.reload();
  }).catch((err) => {
    console.log('err');
    location.reload();
  });
}

function handleData(data, onEnd){
  script.setup(data, onEnd);
  script.start();
}