import $ from 'jquery'

import VideoScene from './VideoScene'
import HypeScene from './HypeScene'

export default class Scene {
  constructor(data, description, container) {
    switch (description.type) {
      case 'media':
        return new VideoScene(data, description, container);
      case 'hype':
        return new HypeScene(data, description, container);
    }

    this.scene = description.scene;
    this.container = container;
    this.data = data;
  }
  // this is the play of the scene
  play() {
    const { audioSrc, endOnAudio = false, background } = this.scene
    const getScene = () => {
      const playingDOM = this.scene.play(this.data, endOnAudio ? () => { } : this.onEnd);
      this.handleAudio(audioSrc, endOnAudio);
      return playingDOM;
    }
    if(background){
      const { from, color } = background;
      const $background = $(`<div class="background slide-in-${from}" style="background-color:${color}"></div>`)
      $background.on('animationend webkitAnimationEnd oAnimationEnd', () =>
        $(this.container).append(getScene())
      );
      $(this.container).html($background);
    }else{
      const scenes = getScene()
      $(this.container).html(scenes);
    }
  }
  handleAudio(audioSrc, endOnAudio){
    if (audioSrc) {
      const $audio = $(`<audio src=${audioSrc}/></audio>`);
      $(this.container).append($audio);
      const audio = $audio.get(0);
      audio.play();
      if(endOnAudio){
        audio.addEventListener('ended', this.onEnd);
      }
      return audio
    }
  }
}

