

import Scene from './scenes/Scene';

import sceneDescriptions from './scenes.js';
const LOOP = false;

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
    this.currentIndex = index;
    this.scenes[index].play();
  }
  playNext(){
    console.log('trying to playing next')
    if (++this.currentIndex < this.scenes.length){
      this.play(this.currentIndex);
    }
    else if(LOOP){
      this.play(0);
    }
  }
}

export default Script