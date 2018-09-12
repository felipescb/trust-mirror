import $ from 'jquery'

export default class VideoScene {
  constructor(data, description, container) {
    this.description = description;
    this.container = container;
    this.data = data;
    this.handleAttrs = this.handleAttrs.bind(this);
  }
  play() {
    this.$wrapper = $('<div class="video-container"></div>');
    this.video = this.handleVideo();
    this.audio = this.handleAudio();
    const endTrigger = (this.audio && this.audio.duration > this.video.duration) ? this.audio : this.video;
    endTrigger.addEventListener('ended', this.onEnd);
    $(this.container).html(this.$wrapper);
    this.video.play();
  }
  handleAttrs(){
    const { attrs } = this.description
    if(attrs && attrs.length){
      attrs.forEach( attr => {
        const $elem = $(attr.domGenerator(this.data));
        setTimeout(() => {
          $elem.appendTo(this.$wrapper);
        }, attr.in || 0)
        if(attr.out !== undefined){
          setTimeout(() => {
            $elem.remove();
          }, attr.out);
        }
      });
    }
  }
  handleAudio({ audioSrc } = this.description){
    if (audioSrc){
      const $audio = $(`<audio src=${audioSrc}/></audio>`);
      this.$wrapper.append($audio);
      const audio = $audio.get(0);
      this.video.addEventListener('play', audio.play);
      return audio
    }
  }
  handleVideo({ src } = this.description){
    const $video = $(`<video controls><source src=${src}/></video>`);
    this.$wrapper.append($video);
    const video = $video.get(0);
    video.addEventListener('play', this.handleAttrs);
    return video;
  }
}