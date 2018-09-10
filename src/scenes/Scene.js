import VideoScene from './VideoScene'
import HypeScene from './HypeScene'

export default class Scene {
  constructor(data, description, container) {
    switch (description.type) {
      case 'video':
        return new VideoScene(data, description, container);
      case 'hype':
        return new HypeScene(data, description, container);
    }
  }
  play() {
    console.log("I don't know how to play this, skipping it :(", this.description);
  }
}

