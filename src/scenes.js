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
// require is required here else parcel won't
// move the files to /dist in dev at least
export default (data) => {
  const lang = data.lang;

  const HELLO = {
    type: 'media',
    src: '/assets/video/hello_compr.mp4',
    audioSrc: '/assets/audio/hello.mp3',
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

  const GOODBYE = {
    type: 'media',
    src: '/assets/video/goodbye_compr.mp4',
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
  const BALLOONS = {
    type: 'custom',
    scene: {
      background: {
        color: '#B72CFF',
        from: 'top'
      },
      play: ballonsPlay,
    },
  }

  const LIKES = {
    type: 'custom',
    scene: {
      play: stampsPlay,
      background: {
        color: '#FE01CD',
        from: 'left'
      }
    },
  }

  const CACHED = data.cached.map(trait => ({
    type: 'media',
    src: '/assets/video/' + lang + '_'+trait.phrase.replace(/([ -])/g, '_').toLowerCase() + '.mp4',
  }));

  const FACETS = {
    type: 'custom',
    scene: {
      play: facetsPlay,
      background: {
        color: '#000',
        from: 'right',
      }
    }
  }

  const CONSUMPTION_PREFS = {
    type: 'custom',
    scene: {
      play: consumptionPlay,
      background: {
        color: '#000',
        from: 'top',
      }
    }
  }
  return [
    HELLO, 
    LIKES, 
     BALLOONS,
    FACETS,
    CONSUMPTION_PREFS,
    ...CACHED, 
    GOODBYE,
  ]
}