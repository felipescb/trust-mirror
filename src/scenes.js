//X welcome
//X hello
//X ballons?
//X data.likes? => stamps style(see vitas mail)
//CANCELLED you_are
//X data.cached string.replace("- ", "_").toLowerCase() // 6-9 videos only
//X data.raw.consumption_preferences show all sentences, choose max 3 audios from a limited list
//X data.personality display all facets with number 
// black?

import ballonsPlay from './scenes/BalloonSceneGenerator'
import stampsPlay from './scenes/Stamps'
import facetsPlay from './scenes/FacetsPlay'
import consumptionPlay from './scenes/ConsumptionPlay'

const i18n = {
  goodbye: {
    thankYou: 'Thank you',
    youAre: 'You are the content',
  }
}

const pathPrefix = '/assets/CACHED_CONTENT/CACHED_AUDIO/cached_main_audio/';
const pather = (fileName) => `${pathPrefix}${fileName}.wav`
const createAudioScene = (audioSrc, prefix = pathPrefix) => ({ type: 'media', audioSrc: prefix+audioSrc+'.wav' })
export default (data) => {
  const lang = data.lang;

  const HELLO_0 = {
    type: 'media',
    src: '/assets/video/hello_compr.mp4',
    audioSrc: pather('0_HELLO'),
    attrs: [
      {
        domGenerator: () => {
          const { identifier } = data
          const firstName = identifier.split(' ')[0];
          const tooMany = firstName.length >= 13;
          const hello = tooMany ? '<h1 style="top:15%;font-size:2em; " class="floating">Hello</h1>' : '';
          return `<div style="color:#111"> \
          ${hello}
          <div style="color:#111 ;bottom:71.8%;top:21.7%; font-size: 1.5em;" class="floating flex-center">${tooMany ? '' : 'Hello'} ${firstName} \
          </div>`
        },
        in: 2800,
      }
    ]
  }

  const GOODBYE_13 = {
    type: 'media',
    src: '/assets/video/goodbye_compr.mp4',
    audioSrc: pather('13_OUTRO'),
    attrs: [
      {
        domGenerator: () => `<div class="floating flex-center" style="font-size:2.5rem;top:26.5%;bottom:67%;color:#111">${i18n.goodbye.thankYou}.</div>`,
        in: 0,
        // out: 5000
      },
      {
        domGenerator: () => `
          <div class="floating flex-center" style="font-size:1.5rem;top:36.5%;bottom:57%;color:#111">${i18n.goodbye.youAre}</div>
        `,
        in: 0,
        // out: 5000
      }
    ]
  }
  const BALLOONS_4 = {
    type: 'custom',
    scene: {
      background: {
        color: '#B72CFF',
        from: 'top'
      },
      play: ballonsPlay,
      audioSrc: pather('2_HOW_DO_YOU_SEE_YOURSELF'),
      endOnAudio: false,
    },
  }

  const LIKES_2 = {
    type: 'custom',
    scene: {
      play: stampsPlay,
      audioSrc: pather('4_HOW_IMPORTANT_ARE_THESE_THINGS'),
      background: {
        color: '#FE01CD',
        from: 'left'
      }
    },
  }

  const createBIG5 = (posNeg) => data.cached.filter(c => c.type === posNeg).map(trait => {
    const fileName = `${trait.id.replace('facet_', '')}_${trait.pole}`.toUpperCase();
    return {
      type: 'media',
      src: '/assets/CACHED_CONTENT/CACHED_ANIMATIONS/' + fileName + '.mp4',
      audioSrc: '/assets/CACHED_CONTENT/CACHED_AUDIO/cached_facets_audio/' + fileName + '.wav'
    }
  });
  
  const CONSUMPTION_PREFS_10 = {
    type: 'custom',
    scene: {
      play: consumptionPlay,
      audioSrc: '10_HOW_OUR_CLIENTS_SEE_YOU',
      background: {
        color: '#000',
        from: 'top',
      }
    }
  }

  const FACETS_12 = {
    type: 'custom',
    scene: {
      play: facetsPlay,
      audioSrc: pather('GOOD_HARD_LOOK'),
      background: {
        color: '#000',
        from: 'right',
      }
    }
  }

  return [
    HELLO_0,
    createAudioScene('1_INTRO'),
    LIKES_2,
    createAudioScene('3_HOW_DO_OTHERS_SEE_YOU'),
    BALLOONS_4,
    createAudioScene('5_ASSESSMENT'),
    ...createBIG5('positive'), // 6
    createAudioScene('7_COME_CLOSER'),
    ...createBIG5('negative'), // 8
    createAudioScene('9_PURGATORY'),
    CONSUMPTION_PREFS_10,
    createAudioScene('11_LEARNING_TO_SEE'),
    FACETS_12,
    GOODBYE_13,
  ]
}
