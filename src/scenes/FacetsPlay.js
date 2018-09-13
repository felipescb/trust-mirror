import $ from 'jquery';
import CountUp from 'countup';
import { flatten, shuffleArray } from '../utils'

window.$ = $;
// CONFIG

export default function(data, onEnd){
  const $wrapper = $('<div class="facets-wrapper f-h a-c"></div>');
  const facets = flatten(
    data.facets.map(big5 => 
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
    const invisible = $('.invisible');
    if(invisible.length > 0){
      const rdm = parseInt(Math.random() * invisible.length - 1);
      chosen = $(invisible[rdm]);
      chosen.toggleClass('invisible clip-on');
      const numb = $('.count', chosen);
      const id = numb.attr('id')
      const count = parseFloat(numb.text());
      var countup = new CountUp(id, 0, count, 5, 3, { 
        separator: '', 
        useEasing: false,
      })
      countup.start();
      setTimeout(showNext, Math.random()*200+200)
    }
    else{
      setTimeout(onEnd, 3000);
    }
  }
  setTimeout(showNext, 800)
  return $wrapper;

  function createFacet(facet, i) {
    const { name, percentile, category } = facet;
    const $facet = $(`<div class="facet invisible">
      ${name}: <span class="count" id="f-${i}">${parseInt(percentile * 10000000)/100000}</span>%
      <br>
      <span style="font-size: .8em">${category}</span>
    </div>`);
    $wrapper.append($facet)
  }
}