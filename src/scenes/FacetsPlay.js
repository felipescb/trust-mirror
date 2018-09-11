import $ from 'jquery';
import CountUp from 'countup';

window.$ = $;
// CONFIG
const maxTopForStamps = 80;
const minTopForStamps = 10;
const maxFontSizeOffset = 1.5;

export default function(data, onEnd){
  const $wrapper = $('<div class="facets-wrapper f-h a-c"></div>')
  const facets = flatten(
    data.raw.personality.map(big5 => 
      big5.children.map(c => {
        c.category = big5.name 
        return c
      }
      )
    )
  );
  shuffleArray(facets);
  facets.forEach(createFacet);

  function showNext(){
    const hidden = $('.hidden');
    const chosen = $(hidden[parseInt(Math.random()*hidden.length -1)]);
    chosen.removeClass('hidden');
    const numb = $('.count', chosen);
    const id = numb.attr('id')
    const count = parseInt(numb.text());
    var countup = new CountUp(id, 0, count, 8, 3, { separator: '' })
    console.log(numb)
    countup.start();
    if(hidden.length > 0){
      setTimeout(showNext, Math.random()*300+600)
    }
  }
  setTimeout(showNext, 800)
  return $wrapper;

  function createFacet(facet, i) {
    const { name, percentile, category } = facet;
    const $facet = $(`<div class="facet hidden">
      ${name}: <span class="count" id="f-${i}">${parseInt(percentile * 1000000)}</span>
      <br>
      <span style="font-size: .8em">${category}</span>
    </div>`);
    $facet.css({
      textShadow: ''
    });
    $wrapper.append($facet)
  }
  return $wrapper;
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}