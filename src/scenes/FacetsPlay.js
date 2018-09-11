import $ from 'jquery';

// CONFIG
const maxTopForStamps = 80;
const minTopForStamps = 10;
const maxFontSizeOffset = 1.5;

export default function(data, onEnd){
  const $wrapper = $('<div class="facets-wrapper f-v a-c"></div>')
  const facets = flatten(data.raw.personality.map(big5 => big5.children));
  facets.forEach(createFacet);
  //setTimeout(createFacets, Math.random() * 700 + 300);
  let popped = 0;
  return $wrapper;

  function createFacet() {
    const { name, percentile, category } = facets.pop();
    popped++;
    const facet = $(`<div class="facet hidden">
      ${name}:0.${parseInt(percentile*1000000)}
      <br>
      <span style="font-size: .7em">${category}</span>
    </div>`);
    facet.css({
      //fontSize: `${Math.random() * maxFontSizeOffset + 1}rem`,
      textShadow: ''
    });
    $wrapper.append(facet)


    if (facets.length > popped) {
      setTimeout(createFacet, Math.random() * 600 + 300)
    }
    else {
      setTimeout(onEnd, 2000);
    }
  }
  return $wrapper;
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);