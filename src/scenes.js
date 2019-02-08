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
import postsPlay from './scenes/Posts'
import consumptionPlay from './scenes/ConsumptionPlay'

//this should not be here
if(!Array.prototype.hasOwnProperty('interpolate')) {
  Array.prototype.interpolate = function(other) {
    var limit = this.length < other.length ? other.length : this.length;
    var out = [];
  
    for(var i = 0; i < limit; i++) {
      if(this.length > 0) out.push(this.shift());
      if(other.length > 0) out.push(other.shift());
    }
    
    return out;
  }
}

const i18n = {
  hello : {
    EN: 'Hello',
    FR: 'Bonjour',  
  },
  thankTrust: {
    EN: 'Thank you for trusting us.',
    FR: 'Merci de nous faire confiance.',
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


  const PRE = createAudioScene('0_PRE', pathPrefix, [
      {
        domGenerator: () => { console.log('PRE SCENE'); },
        in: 0,
        out: 1000
      }
    ]
  )
  
  const HELLO_1 = {
    type: 'media',
    src: '/assets/video/hello_compr.mp4',
    audioSrc: pather('1_Hello'),
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
        in: 2600,
      }
    ]
  }

  //Thanks For Trusting Us
  const TFTU_2 = createAudioScene('2_Welcome_Thank_You', pathPrefix, [
      {
        domGenerator: () => `<div class="text-wrapper"><div class="logo"> <img src="/assets/images/logo.png"> </div>${thankYouFor}</div>`,
        in: 1000,
        out: 4000
      }
    ]
  )

  const MAKE_CONFORTABLE_3 = createAudioScene("3_Please_Make");

  const BALLOONS_4 = {
    type: 'custom',
    scene: {
      background: {
        color: '#B72CFF',
        from: 'top'
      },
      play: ballonsPlay,
      audioSrc: pather('4_How_do_you_think_others_see_you'),
      endOnAudio: false,
    },
  }
  
  const LIKES_5 = {
    type: 'custom',
    scene: {
      play: stampsPlay,
      audioSrc: pather('5_How_Important_Are_These_Things'),
      background: {
        color: '#FE01CD',
        from: 'left'
      }
    },
  }

  const TROUGHT_SESSION_6 = createAudioScene("6_Through_Todays_Session");
  
  const TFTU_7 = createAudioScene('7_Thank_You_For_Trusting_Us', pathPrefix, [
      {
        domGenerator: () => `<div class="text-wrapper">${thankYouFor}</div>`,
        in: 1000,
        out: 3000
      }
    ]
  )

  const HAPPINESS_PRIORITY_8 = createAudioScene("8_Your_Happiness_Is_Our_Priority");

  //the inbetween Big 5 Pos
  const ISNT_GREAT_10 = createAudioScene("10_Isnt_That_Great");
  const NOW_HERE_EVER_12 = createAudioScene("12_Now_More_Than_Ever");
  const WEALL_LIKE_14 = createAudioScene("14_We_All_Like_This");
  const DESERVES_SMILE_16 = createAudioScene("16_This_Deserves_A_Smile");

  const inbetweenPos = [ISNT_GREAT_10, NOW_HERE_EVER_12, WEALL_LIKE_14, DESERVES_SMILE_16];
  
  const createBIG5WithBetween = (posNeg, inbetween) => {
    let facets = createBIG5(posNeg);
    return facets.interpolate(inbetween);        
  }

  const createBIG5 = (posNeg) => data.cached.filter(c => c.type === posNeg).map(trait => {
    const fileName = `${trait.id.replace('facet_', '')}_${trait.pole}`.toUpperCase();
    return {
      type: 'media',
      src: '/assets/CACHED_CONTENT/CACHED_ANIMATIONS/'+ lang + '/' + fileName + '.mp4',
      audioSrc: '/assets/CACHED_CONTENT/CACHED_AUDIO/' + lang + '/cached_facets_audio/' + fileName + '.' + audioExtension
    }
  });

  const FEELS_GOOD_18 = createAudioScene("18_Isnt_This_Fun");

  const FEEL_APRECIATED_19 = {
    type: 'media',
    src: '/assets/video/19_apreciated.mp4',
    audioSrc: pather('19_Don_t_You_Feel_Appreciated'),
  }

  const LIKE_SHARING_20 = createAudioScene("20_As_You_Can_see");

  const TFTU_21 = createAudioScene('21_Thank_You_For_Trusting_Us', pathPrefix, [
      {
        domGenerator: () => `<div class="text-wrapper">${thankYouFor}</div>`,
        in: 1000,
        out: 3000
      }
    ]
  )

  const GREAT_PERSONALITY_22 = createAudioScene("22_Youve_Got_A_Great_Personality");

  //the inbetween Big 5 Neg
  const DESPITE_INTENTIONS_24 = createAudioScene("24_Despite_Your_Best_Intentions");
  const NEGLECTING_EFFORTS_26 = createAudioScene("26_Neglecting_Our_Continued_Efforts");
  const FLAWS_RELATIONSHIP_28 = createAudioScene("28_How_Do_You_Think_These_Flaws");
  const GREAT_DISSAPPOINTM_30 = createAudioScene("30_To_Great_Dissappointment");

  const inbetweenNeg = [DESPITE_INTENTIONS_24, NEGLECTING_EFFORTS_26, FLAWS_RELATIONSHIP_28, GREAT_DISSAPPOINTM_30];

  const BECOMING_EXEMPLARY_32 = createAudioScene("32_It_Must_Be_Difficult");
  
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


  let assesmentIn, assesmentOut;
  if (lang == "FR") {
    assesmentIn = 13000;
    assesmentOut = 18000;
  } else {
    assesmentIn = 11000;
    assesmentOut = 13000;
  }

  const thankYouFor = `<div style="font-size: #FFF">${i18n.thankTrust[lang]}</div>`
  const ASSESSMENT_5 = createAudioScene('5_ASSESSMENT', pathPrefix, [
    // 11 seconds
    {
      domGenerator: () => `<div class="text-wrapper">${thankYouFor}</div>`,
      in: assesmentIn,
      out: assesmentOut
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


  var photosLenght = (Object.keys(data.photos).length === 0 && data.photos.constructor === Object) ? 0 : data.photos.length;
  var likesLenght  = (Object.keys(data.likes).length === 0 && data.likes.constructor === Object) ? 0 : data.likes.length;

  //Provavelmente essa é a maneira mais vagabunda de se fazer isso
  if (photosLenght > 0 && likesLenght > 0) {
    console.log("tem fotos e likes")
    return [
      // PRE,
      HELLO_1,
      TFTU_2,
      MAKE_CONFORTABLE_3,
      BALLOONS_4,
      LIKES_5,
      TROUGHT_SESSION_6,
      TFTU_7,
      HAPPINESS_PRIORITY_8,
      ...createBIG5WithBetween("positive", inbetweenPos), // 9
      FEELS_GOOD_18,
      FEEL_APRECIATED_19,
      LIKE_SHARING_20,
      TFTU_21,
      GREAT_PERSONALITY_22,
      ...createBIG5WithBetween("negative", inbetweenNeg), // 23
      BECOMING_EXEMPLARY_32,
      
      PURGATORY_9,
      CONSUMPTION_PREFS_10,
      createAudioScene("11_LEARNING_TO_SEE"),
      FACETS_12,
      //GOODBYE_13,
      END
    ];

  } else if (photosLenght > 0 && likesLenght <= 0) {
    console.log("tem fotos e não likes")
    return [
      // PRE,
      HELLO_1,
      TFTU_2,
      MAKE_CONFORTABLE_3,
      BALLOONS_4,
      TROUGHT_SESSION_6,
      TFTU_7,
      HAPPINESS_PRIORITY_8,
      ...createBIG5WithBetween("positive", inbetweenPos), // 9
      FEELS_GOOD_18,
      FEEL_APRECIATED_19,
      LIKE_SHARING_20,
      TFTU_21,
      GREAT_PERSONALITY_22,
      ...createBIG5WithBetween("negative", inbetweenNeg), // 23
      BECOMING_EXEMPLARY_32,

      PURGATORY_9,
      CONSUMPTION_PREFS_10,
      createAudioScene("11_LEARNING_TO_SEE"),
      FACETS_12,
      //GOODBYE_13,
      END
    ];

  }  else if (photosLenght <= 0 && likesLenght > 0) {
    console.log("não tem fotos e tem likes")
    return [
      // PRE,
      HELLO_1,
      TFTU_2,
      MAKE_CONFORTABLE_3,
      LIKES_5,
      TROUGHT_SESSION_6,
      TFTU_7,
      HAPPINESS_PRIORITY_8,
      ...createBIG5WithBetween("positive", inbetweenPos), // 9
      FEELS_GOOD_18,
      FEEL_APRECIATED_19,
      LIKE_SHARING_20,
      TFTU_21,
      GREAT_PERSONALITY_22,
      ...createBIG5WithBetween("negative", inbetweenNeg), // 23
      BECOMING_EXEMPLARY_32,

      PURGATORY_9,
      CONSUMPTION_PREFS_10,
      createAudioScene("11_LEARNING_TO_SEE"),
      FACETS_12,
      //GOODBYE_13,
      END
    ];


  } else {
    console.log("não tem fotos e nao tem likes")
    return [
      // PRE,
      HELLO_1,
      TFTU_2,
      MAKE_CONFORTABLE_3,
      TROUGHT_SESSION_6,
      TFTU_7,
      HAPPINESS_PRIORITY_8,
      ...createBIG5WithBetween("positive", inbetweenPos), // 9
      FEELS_GOOD_18,
      FEEL_APRECIATED_19,
      LIKE_SHARING_20,
      TFTU_21,
      GREAT_PERSONALITY_22,
      ...createBIG5WithBetween("negative", inbetweenNeg), // 23
      BECOMING_EXEMPLARY_32,

      PURGATORY_9,
      CONSUMPTION_PREFS_10,
      createAudioScene("11_LEARNING_TO_SEE"),
      FACETS_12,
      //GOODBYE_13,
      END
    ];

  }
  
}
