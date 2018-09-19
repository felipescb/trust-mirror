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
  hello : {
    EN: 'Hello',
    FR: 'Bonjour',  
  },
  thankTrust: {
    EN: 'Thank you for trusting us.',
    FR: 'Merci pour votre confiance en nous.',
  },
  goodbye: {
    thankYou: 'Thank you.',
    youAre: 'You are the content.',
  },
  thankYou: {
    EN : 'Thank you.',
    FR : 'Merci beaucoup'
  },
  youAre : {
    EN: 'You are the content.' ,
    FR: 'Vous êtes le contenu.'
  }
}

// scenes are expected in the following format:
// type: 'media' or 'custom'
// src: 'url of the video'
// audioSrc: 'url of the audio'
// attrs: array of
//   domGenerator(data): function returning a dom string
//   in: time in ms should it appear
//   out: time in ms should it disappear
// // if custom
// play(data, onEnd): function returning a jQuery dom object.
//                    call onEnd to pass to next scene(effectively calls script.playNext)

export default (data) => {
  const lang = data.lang.toUpperCase();

  //ça çe tree horrible
  let pathPrefix;
  if (lang == "FR") {
    pathPrefix = '/assets/CACHED_CONTENT/CACHED_AUDIO/FR/cached_main_audio/';
  } else {
    pathPrefix = '/assets/CACHED_CONTENT/CACHED_AUDIO/EN/cached_main_audio/';
  }

  const audioExtension = 'mp3'
  const pather = (fileName) => `${pathPrefix}${fileName}.${audioExtension}`
  const createAudioScene = (audioSrc, prefix = pathPrefix, attrs) => ({ type: 'media', audioSrc: prefix + audioSrc + '.' + audioExtension, attrs })

  
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
          const hello = tooMany ? '<h1 style="top:15%;font-size:2em; " class="floating">{{$i18n.hello[lang]}}</h1>' : '';
          return `<div style="color:#111"> \
            ${hello}
            <div style="color:#111 ;bottom:71.8%;top:21.7%; font-size: 1.5em;" class="floating flex-center">${tooMany ? '' : i18n.hello[lang]} ${firstName} \
          </div>`
        },
        in: 2800,
      }
    ]
  }
  const INTRO_1 = createAudioScene('1_INTRO', pathPrefix, [
      {
        domGenerator: () => `<div class="text-wrapper"><div class="logo"> <img src="/assets/images/logo.png"> </div>${thankYouFor}</div>`,
        in: 7000,
        out: 11000
      }
    ]
  )

  const INTRO_1a = {
    type: 'media',
    src: '/assets/video/1a_intro.mp4',
    audioSrc: pather('1a_INTRO'),
  }

  const GOODBYE_13 = {
    type: 'media',
    src: '/assets/video/goodbye_compr.mp4',
    audioSrc: pather('13_OUTRO'),
    attrs: [
      {
        domGenerator: () => `<div class="floating flex-center" style="font-size:2.5rem;top:26.5%;bottom:67%;color:#111">${i18n.thankYou[lang]}.</div>`,
        in: 0,
        out: 4900
      },
      {
        domGenerator: () => `
          <div class="floating flex-center" style="font-size:1.5rem;top:36.5%;bottom:57%;color:#111">${i18n.youAre[lang]}</div>
        `,
        in: 0,
        out: 5200
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
      src: '/assets/CACHED_CONTENT/CACHED_ANIMATIONS/'+ lang + '/' + fileName + '.mp4',
      audioSrc: '/assets/CACHED_CONTENT/CACHED_AUDIO/' + lang + '/cached_facets_audio/' + fileName + '.' + audioExtension
    }
  });
  
  const CONSUMPTION_PREFS_10 = {
    type: 'custom',
    scene: {
      play: consumptionPlay,
      audioSrc: pather('10_HOW_OUR_CLIENTS_SEE_YOU'),
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
      audioSrc: pather('12_GOOD_HARD_LOOK'),
      background: {
        color: '#000',
        from: 'right',
      }
    }
  }


  const thankYouFor = `<div style="font-size: #FFF">${i18n.thankTrust[lang]}</div>`
  const ASSESSMENT_5 = createAudioScene('5_ASSESSMENT', pathPrefix, [
    // 11 seconds
    {
      domGenerator: () => `<div class="text-wrapper">${thankYouFor}</div>`,
      in: 11000,
      out: 13000
    }
  ]
  )
  const COME_CLOSER_7 = createAudioScene('7_COME_CLOSER', pathPrefix, [
    // 16 seconds
      {
        domGenerator: () => `<div class="text-wrapper">${thankYouFor}</div>`,
        in: 16500,
        out: 18000
      }
    ]
  )
  const PURGATORY_9 = createAudioScene('9_PURGATORY', pathPrefix,
    [
    // 11seconds
      {
        domGenerator: () => `<div class="text-wrapper">${thankYouFor}</div>`,
        in: 11500,
        out: 13000
      }
    ]
  );

  const END = {
    type: 'custom',
    scene: {
      play: (data, onEnd) => {
        onEnd(data);
        $('<div class="text-wrapper">' + thankYouFor + '</div>')
      }
    }
  };

  return [
    HELLO_0,
    INTRO_1,
    INTRO_1a,
    LIKES_2,
    createAudioScene('3_HOW_DO_OTHERS_SEE_YOU'), // => video + audio
    BALLOONS_4,
    ASSESSMENT_5,
    ...createBIG5('positive'), // 6
    COME_CLOSER_7,
    ...createBIG5('negative'), // 8
    PURGATORY_9,
    CONSUMPTION_PREFS_10,
    createAudioScene('11_LEARNING_TO_SEE'),
    FACETS_12,
    GOODBYE_13,
    END,
  ]
}
