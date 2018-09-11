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
    const { from, color } = this.scene.background;
    const background = $(`<div class="background slide-in-${from}" style="background-color:${color}"></div>`)
    background.on('animationend webkitAnimationEnd oAnimationEnd', (evt) => {
      console.log(evt)
      const media = this.scene.play(this.data, this.onEnd);
      $(this.container).append(media);
    })
    $(this.container).html(background);
  }
}

