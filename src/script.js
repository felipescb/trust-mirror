

import Scene from './scenes/Scene';

import sceneDescriptions from './scenes.js';
const LOOP = false;

class Script{
  constructor(){
    this.currentIndex = 0;
    this.playNext = this.playNext.bind(this);
  }
  setup(data, onEnd){
    this.container = document.getElementById('container');
    this.container.onmousedown = this.playNext.bind(this);
    this.onEnd = onEnd;
    this.createScenes(data);
  }
  createScenes(data){
    this.data = data;
    const generatedScenes = sceneDescriptions(data);
    this.scenes = generatedScenes.map(desc => {
      // pass the container used by scenes
      // to call this.container.html(theScene)
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
    this.currentIndex = index;
    this.scenes[index].play();
  }
  playNext(){
    if (++this.currentIndex < this.scenes.length){
      console.log('playing next', this.currentIndex, this.scenes[this.currentIndex])
      this.play(this.currentIndex);
    }
    else if(LOOP){
      this.play(0);
    }
    else{
      this.onEnd(this.data);
    }
  }
}

export default Script