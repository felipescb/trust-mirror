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

    this.scene = description.scene;
    this.container = container;
    this.data = data;
  }
  play() {
    const backgroundProps = this.scene.background;
    const background = $(`<div class="background slide-in-${backgroundProps.side}" style="background-color:${backgroundProps.color}"></div>`)
    background.on('animationend webkitAnimationEnd oAnimationEnd', (evt) => {
      console.log(evt)
      const media = this.scene.play(this.data, this.onEnd);
      $(this.container).append(media);
    })
    $(this.container).html(background);
  }
}

