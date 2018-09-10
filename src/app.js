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
    const scene = newScene(desc);
    scene.onEnd = this.playNext;
    scene.play();
  }
  playNext(){
    if(++this.currentIndex < sceneDescriptions.length){
      this.play(this.currentIndex);
    }
  }

}

function newScene(desc){
  switch(desc.type){
    case 'video':
      return new VideoScene(desc);
    case 'hype':
      return new HypeScene(desc);
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
}

class VideoScene extends Scene{
  play(){
    console.log('playing video', this.description)
    super.play();
  }
}

class HypeScene extends Scene {
  play() {
    console.log('playing hype', this.description)
    super.play();
  }
}

export default Journey