import $ from 'jquery'

export default class VideoScene {
  constructor(data, description, container) {
    this.description = description;
    this.container = container;
    this.data = data;
  }
  play() {
    this.$wrapper = $('<div class="video-container"></div>');
    this.video = this.handleVideo();
    this.audio = this.handleAudio();
    const endTrigger = this.video.duration > this.audio.duration ? this.video : this.audio;
    endTrigger.addEventListener('ended', this.onEnd);
    $(this.container).html(this.$wrapper);
    this.video.addEventListener('play', () =>{
      this.handleAttrs();
      this.audio.play();
    });
    this.video.play();
  }
  handleAttrs(){
    const attrs = this.description.attrs;
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
    const $audio = $(`<audio src=${audioSrc}/></audio>`);
    this.$wrapper.append($audio);
    const audio = $audio.get(0);
    return audio
  }
  handleVideo({ src } = this.description){
    const $video = $(`<video><source src=${src}/></video>`);
    this.$wrapper.append($video);
    const video = $video.get(0);
    return video;
  }
}