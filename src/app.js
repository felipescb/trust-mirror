
import Scene from './scenes/Scene';
import ballonsPlay from './scenes/BalloonSceneGenerator'
import stampsPlay from './scenes/Stamps'
//X welcome
//X hello
//X ballons?
// data.likes? => stamps style(see vitas mail)
// you_are
// data.cached string.replace("- ", "_").toLowerCase() // 6-9 videos only
// data.raw.consumption_preferences TBC
// black?

const LOOP = false;

const sceneDescriptions = (data) => [
  {
    type: 'video',
    src: () => require('../assets/video/hello_compr.mp4'),
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
  },
  {
    type: 'custom',
    scene: {
      play: stampsPlay,
      background: {
        color: '#FE01CD',
        from: 'left'
      }
    },
  },
  {
    type: 'custom',
    scene: {
      background: {
        color: '#B72CFF',
        from: 'top'
      },
      play: ballonsPlay,
    },
  },
]

class Script{
  constructor(){
    this.currentIndex = 0;
    this.playNext = this.playNext.bind(this);
  }
  setup(data){
    this.container = document.getElementById('container');
    this.container.onmousedown = this.playNext.bind(this);
    this.createScenes(data);
  }
  createScenes(data){
    this.data = data;
    // sort data.cached by type(positive, negative)
    // play each phrase.mp4
    this.scenes = sceneDescriptions(data).map(desc => {
      const scene = new Scene(this.data, desc, this.container);
      scene.onEnd = this.playNext;
      return scene;
    })
  }
  start(){
    if(!this.playing){
      this.playing = true;
      this.play(0);
    }
  }
  play(index = this.currentIndex) {
    console.log(this, this.currentIndex)
    this.currentIndex = index;
    this.scenes[index].play();
  }
  playNext(){
    if (++this.currentIndex < this.scenes.length){
      this.play(this.currentIndex);
    }
    else if(LOOP){
      this.play(0);
    }
  }
}

export default Script