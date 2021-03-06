import $ from 'jquery'

// CONFIG
const maxTopForStamps = 80;
const minTopForStamps = 10;
const maxFontSizeOffset = 1.5;

const stampTimeOffset = 600;

export default function StampsPlay(data, onEnd) {
  const wrapper = $('<div class="wrapper"></div>');
  const strings = data.likes.slice(0, 30).map(like => like.name);
  setTimeout(createStamp, Math.random()*700+300);
  let popped = 0;
  return wrapper;

  function createStamp(){
    const str = strings.pop();
    popped++;
    const stamp = $('<div class="stamp">'+str+'</div>');
    const top = Math.random() * maxTopForStamps + minTopForStamps;
    const transformOrigin = top > 50 ? 'center left' : 'center right'
    stamp.css({
      position: 'fixed',
      top: top + '%',
      left: (Math.random()*80 + 10) +'%',
      transform: `translateX(-50%) rotate(${Math.random()>.5 ? -90 : 0}deg)`,
      transformOrigin: transformOrigin,
      fontSize: `${Math.random()*maxFontSizeOffset+1}rem`,
      textShadow: ''
    });
    if (strings.length > popped){
      setTimeout(createStamp, Math.random() * stampTimeOffset + 300)
    }
    else{
      setTimeout(onEnd, 2000);
    }
    wrapper.append(stamp)
  }
}