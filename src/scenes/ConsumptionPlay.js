import $ from 'jquery';
import { flatten } from '../utils'

const allowed = [
  'consumption_preferences_automobile_ownership_cost',
  'consumption_preferences_automobile_safety',
];
const audios = [];

const prefixes = {
  en: {
    0: 'You are not',
    .5: 'You may be',
    1: 'You are',
  },
  fr: {
    0: 'Vous n\'êtes pas',
    .5: 'Vous êtes peut-être',
    1: 'Vous êtes',
  }
}

export default function ({ marketPreferences, lang }, onEnd){
  const fr = lang == 'fr' ? lang+'_' : ''
  const $wrapper = $('<div class="f-v wrapper scrollable"></div>')
  const prefs = flatten(marketPreferences.map(pref => pref.preferences))
  let offset = 250;
  prefs.forEach((pref, i) => {
    const string = [
      prefixes[lang][pref.score],
      pref.name.toLowerCase()
    ].join(' ')
    const $pref = $(`<div class="pref">${string}</div>`);
    setTimeout(() => {
      $pref.appendTo($wrapper);
      $wrapper.get(0).scrollTop += 500
    }, (1+i)*offset);
    // $wrapper.append($pref);
    if(audios.length == 0 && i == prefs.length - 1){
      setTimeout(onEnd, (1+i)*offset + 2000)
    }
  })
  prepareAudios(prefs);
  handleAudios(audios);
  return $wrapper;
  

  function prepareAudios(prefs){
    prefs.filter(p => p.score > .5).map(p => p.consumption_preference_id).forEach(id => {
      if(allowed.includes(id)){
        audio.push('/assets/audio/'+id+'.mp3');
      }
    });
  }

  function handleAudios(audios){
    if(audios.length){
      let i = 0;
      playTrack(audios[i])
      function playTrack(audio){
        if(audio){
          const $audio = $(`<audio src="${audio}" />`)
          $audio.appendTo($wrapper);
          const audio = $audio.get(0);
          audio.addEventListener('onEnd', () => playTrack(audios[++i]))
          audio.play()
        }
        else{
          setTimeout(onEnd, 2000)
        }
      }
    }
  }
}
