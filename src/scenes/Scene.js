import VideoScene from './VideoScene'
import HypeScene from './HypeScene'

export default class Scene {
  constructor(description) {
    this.description = description
    switch (description.type) {
      case 'video':
        return new VideoScene(description);
      case 'hype':
        return new HypeScene(description);
    }
  }
  play() {
    console.log("I don't know how to play this, skipping it :(", this.description);
  }
}

