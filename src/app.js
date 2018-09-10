const sceneDescriptions = [
  {
    type: 'video',
    src: require('./1_welcome.mp4'),
  },
  {
    type: 'video',
    src: require('./1_welcome.mp4'),
  },
  {
    type: 'video',
    src: require('./1_welcome.mp4'),
  }
]

class Journey{
  constructor(data){
    this.currentIndex = 0;
    this.data = data;
    console.log(this.data);
    
    this.playNext = this.playNext.bind(this);
  }
  play(index = this.currentIndex) {
    this.currentIndex = index;
    const desc = sceneDescriptions[index]
    console.log("Playing", index, desc);
    const scene = new Scene(desc);
    scene.onEnd = this.playNext;
    scene.play();
  }
  playNext(){
    if(++this.currentIndex < sceneDescriptions.length){
      this.play(this.currentIndex);
    }
  }

}

class Scene{
  constructor(description){
    this.description = description
  }
  play(){
    console.log(this.description);
    this.onEnd();
  }
  onEnd(){
    console.log('Not implemented yet!')
  }
}

export default Journey