import $ from 'jquery'
import { shuffle, shuffleArray } from '../utils'

export default function ballonsPlay(data, onEnd){
  const player = $('<div></div>');
  const imgs = data.photos;
  let finishedCount = 0;
  let lastTime = 0;
  const imgsCount = imgs.length;
  const shouldBalloonsGoOutOfScreen = imgsCount > 8;

  const minUpDuration = shouldBalloonsGoOutOfScreen ? 4000 : 2000;
  const minTimeBtwBalloons = shouldBalloonsGoOutOfScreen ? 300 : 600;


  const yPos = [], xPos = [], xStart = [];

  for (let i = 0; i < imgs.length; i++) {
    const spread = 85 / imgsCount;
    const sign = () => Math.random() > .5 ? 1 : -1;
    yPos.push(Math.random() * 5 + spread*i+1);
    xPos.push(sign()*Math.random() * 5 + spread*i+1);
    xStart.push(
      50 + sign()*Math.random()*(shouldBalloonsGoOutOfScreen ? 40 : 10)
    )
  }
  shuffleArray(yPos)
  shuffleArray(xPos)
  shuffleArray(xStart)

  
  imgs.forEach((src, i) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const balloon = svg(img, i);
      const start = xStart[i];
      const end = xPos[i];
      const top = imgsCount > 8 ? -80 : yPos[i];
      balloon.css({
        left: start+'%',
        top: '100%',
        animationDelay: i*500+'ms',
      });
      setTimeout(() => 
        balloon.animate({
          left: end + '%',
          top: top + '%',
        }, Math.random() * minUpDuration + 2000, finish), getTime(i))
      player.append(balloon);
    }
  })

  function getTime(i){
    lastTime += Math.random() * minTimeBtwBalloons;
    return lastTime;
  }
  function finish(){
    if(++finishedCount == imgs.length){
      setTimeout(onEnd, 1500);
    }
  }
  return player;
}

function svg(img, i){
  const { src, width, height } = img;

  const isLandscape = width > height;
  let svgWidth, svgHeight;
  if(isLandscape){
    svgWidth = 200;
    svgHeight = 40;
  }
  else{
    svgWidth = 200;
    svgHeight = 100;
  }
  let svg = `<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg class="balloon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 311 895" style="enable-background:new 0 0 311 895;" xml:space="preserve">
        <style type="text/css">
          .st0{fill:none;stroke:#FFFFFF;stroke-width:10;stroke-miterlimit:10;}
        </style>
        <defs>
            <pattern id="img-${i}" patternUnits="userSpaceOnUse" x="-${svgWidth / 4}%" y="-${isLandscape ? 0 : svgHeight/4}%" width="${svgWidth}%" height="${svgHeight}%">
                <image xlink:href="${src}" width="${200}%" height="${svgHeight}%" />
            </pattern>
        </defs>
        <title>test</title>
        <path class="st1" fill="url(#img-${i})" d="M155.6,341.2c0,0-150.5-56.4-150.5-185.8C5,72.4,72.4,5,155.5,5S306,72.4,306,155.5
          C306,284.8,155.6,341.2,155.6,341.2z"/>
        <path class="st0 string" d="M160.2,362.4c0,53.3-11.8,53.3-11.8,106.5s11.8,53.3,11.8,106.5s-11.8,53.3-11.8,106.5s11.8,53.3,11.8,106.5
          s-11.8,53.3-11.8,106.5"/>
        <path class="st0" d="M155.5,341.2c0,0-150.5-56.4-150.5-185.8C5,72.4,72.4,5,155.5,5S306,72.4,306,155.5
          C306,284.8,155.5,341.2,155.5,341.2z"/>
        <path class="st0" d="M155.5,338.9c0,0-10.5,4-10.5,13c-0.4,5.8,3.9,10.9,9.7,11.3c5.8,0.4,10.9-3.9,11.3-9.7c0-0.5,0-1.1,0-1.6
          C166,342.9,155.5,338.9,155.5,338.9z"/>
      </svg>`;
      return $(svg);

}