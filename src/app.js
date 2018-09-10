import Scene from './scenes/Scene';
import ballonsPlay from './scenes/BalloonSceneGenerator'
// welcome
// hello
// ballons?
// data.likes?
// data.cached
// data.raw.consumption_preferences TBC
// black?

const LOOP = true;

const sceneDescriptions = [
  {
    type: 'video',
    src: require('./1_welcome.mp4'),
  },
  {
    type: 'video',
    src: require('../assets/video/hello_compr.mp4'),
    attrs: [
      {
        domGenerator: ({ identifier }) => `<div style="color:#111 ;bottom:71.8%;top:21.7%" class="floating flex-center">${identifier}</div>`,
        in: 2800,
      }
    ]
  },
  {
    type: 'custom',
    play: ballonsPlay,
  },
]

class Script{
  constructor(){
    this.currentIndex = 0;
    this.playNext = this.playNext.bind(this);
  }
  setup(data){
    this.container = document.getElementById('container');
    this.createScenes(data);
  }
  createScenes(data){
    this.data = data;
    // sort data.cached by type(positive, negative)
    // play each phrase.mp4
    this.scenes = sceneDescriptions.map(desc => {
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
    if(++this.currentIndex < sceneDescriptions.length){
      this.play(this.currentIndex);
    }
    else if(LOOP){
      this.play(0);
    }
  }
}

export default Script