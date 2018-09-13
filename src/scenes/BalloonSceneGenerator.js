import $ from 'jquery'

export default function ballonsPlay(data, onEnd){
  const player = $('<div></div>');
  const imgs = data.photos;
  let finishedCount = 0;
  imgs.forEach((src, i) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const balloon = svg(img, i);
      const start = Math.random() * 60 + 10;
      const sign = Math.random() > .5 ? 1 : -1;
      const end = Math.min(70,(1 + sign * Math.random() / 5) * start);
      const top = Math.random() * 50;
      //const top = '-100';
      balloon.css({
        left: start+'%',
        top: '100%',
        animationDelay: i*500+'ms',
      });
      setTimeout(() => 
        balloon.animate({
          left: end + '%',
          top: top + '%',
        }, Math.random() * 3000 + 2000, finish), Math.random()*2000)
      player.append(balloon);
    }
  })
  function finish(){
    if(++finishedCount == imgs.length){
      setTimeout(onEnd, 1500);
    }
  }
  return player;
}

function svg(img, i){
  const { src, width, height } = img;
  let svg = `<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg class="balloon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 311 895" style="enable-background:new 0 0 311 895;" xml:space="preserve">
        <style type="text/css">
          .st0{fill:none;stroke:#FFFFFF;stroke-width:10;stroke-miterlimit:10;}
        </style>
        <defs>
            <pattern id="img-${i}" patternUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <image id="img-${i}"xlink:href="${src}" width="${width}" height="${height}" />
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