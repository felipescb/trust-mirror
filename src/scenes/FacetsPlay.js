import $ from 'jquery';
import CountUp from 'countup';
import { flatten, shuffleArray } from '../utils'

window.$ = $;
// CONFIG
const rowsCount = 6;


export default function(data, onEnd){
  const $wrapper = $('<div class="facets-wrapper f-h a-c"></div>')
  $wrapper.css({
    //gridTemplateRows: `repeat(${rowsCount}, 1fr)`,
    // transform: 'scaleX(-1)'
  })
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
    let chosen;
    const hidden = $('.hidden');
    if(hidden.length > 0){
      const rdm = parseInt(Math.random() * hidden.length - 1);
      chosen = $(hidden[rdm]);
      chosen.toggleClass('hidden clip-on');
      const numb = $('.count', chosen);
      const id = numb.attr('id')
      const count = parseInt(numb.text());
      var countup = new CountUp(id, 0, count, 0, 3, { 
        separator: '', 
        useEasing: false,
      })
      countup.start();
      setTimeout(showNext, Math.random()*300+600)
    }
    else{
      setTimeout(onEnd, 2000);
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