import $ from 'jquery';
import { flatten } from '../utils'

export default function(data, onEnd){
  const $wrapper = $('<div class="f-v a-c wrapper"></div>')
  const prefs = flatten(data.raw.consumption_preferences.map(pref => pref.consumption_preferences))
  let offset = 250;
  prefs.forEach((pref, i) => {
    const $pref = $(`<div class="pref hidden">${pref.name}</div>`);
    setTimeout(() => $pref.removeClass('hidden'), (1+i)*offset);
    $wrapper.append($pref);
  })
  return $wrapper;
}