import $ from 'jquery'

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

    this.description = description;
    this.container = container;
    this.data = data;
  }
  play() {
    const media = this.description.play(this.data, this.onEnd);
    console.log('playing');
    $(this.container).html(media);
  }
}

