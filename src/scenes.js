//X welcome
//X hello
//X ballons?
//X data.likes? => stamps style(see vitas mail)
// you_are
// data.cached string.replace("- ", "_").toLowerCase() // 6-9 videos only
// data.raw.consumption_preferences TBC
// black?

import ballonsPlay from './scenes/BalloonSceneGenerator'
import stampsPlay from './scenes/Stamps'

// require is required here else parcel won't
// move the files to /dist in dev at least
export default (data) => {
  const HELLO = {
    type: 'media',
    src: require('../assets/video/hello_compr.mp4'),
    audioSrc: require('../assets/audio/hello.mp3'),
    attrs: [
      {
        domGenerator: () => {
          const { identifier } = data
          const firstName = identifier.split(' ')[0];
          const tooMany = firstName.length >= 13;
          const hello = tooMany ? '<h1 style="top:10%;font-size:2em; " class="floating">Hello</h1>' : '';
          return `<div style="color:#111"> \
          ${hello}
          <div style="color:#111 ;bottom:71.8%;top:21.7%" class="floating flex-center">${tooMany ? '' : 'Hello'} ${firstName} \
          </div>`
        },
        in: 2800,
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
  return [HELLO, LIKES, BALLOONS]
}