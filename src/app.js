import Scene from './scenes/Scene';

const sceneDescriptions = [
  {
    type: 'video',
    src: require('./1_welcome.mp4'),
  },
  {
    type: 'hype',
    src: require('./1_welcome.mp4'),
  },
  {
    type: 'video',
    src: require('./1_welcome.mp4'),
  }
]

class Journey{
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
    this.scenes = sceneDescriptions.map(desc => {
      const scene = new Scene(desc, this.container);
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
    this.currentIndex = index;
    this.scenes[index].play(this.container);
  }
  playNext(){
    if(++this.currentIndex < sceneDescriptions.length){
      this.play(this.currentIndex);
    }
  }

}

export default Journey