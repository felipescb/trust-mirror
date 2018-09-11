import $ from 'jquery';

// CONFIG
const maxTopForStamps = 80;
const minTopForStamps = 10;
const maxFontSizeOffset = 1.5;

export default function(data, onEnd){
  const $wrapper = $('<div class="facets-wrapper"></div>')
  const facets = flatten(data.raw.personality.map(big5 => big5.children));
  setTimeout(createFacet, Math.random() * 700 + 300);
  let popped = 0;
  return $wrapper;

  function createFacet() {
    const { name, percentile, category } = facets.pop();
    popped++;
    const facet = $(`<div class="stamp facet">
      ${name}:${percentile}
      <br>
      <span style="font-size: .7em">${category}</span>
    </div>`);
    const top = Math.random() * maxTopForStamps + minTopForStamps;
    const transformOrigin = top > 50 ? 'center left' : 'center right'
    facet.css({
      position: 'fixed',
      top: top + '%',
      left: (Math.random() * 25 + 50) + '%',
      transform: `translateX(-50%)`,
      transformOrigin: transformOrigin,
      fontSize: `${Math.random() * maxFontSizeOffset + 1}rem`,
      textShadow: ''
    });
    if (facets.length > popped) {
      setTimeout(createFacet, Math.random() * 600 + 300)
    }
    else {
      setTimeout(onEnd, 2000);
    }
    $wrapper.append(facet)
  }
  return $wrapper;
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);