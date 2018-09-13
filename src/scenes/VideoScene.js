import $ from 'jquery'

export default class VideoScene {
  constructor(data, description, container) {
    this.description = description;
    this.container = container;
    this.data = data;
    this.handleAttrs = this.handleAttrs.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }
  play() {
    this.$wrapper = $('<div class="video-container"></div>');
    this.video = this.handleVideo();
    this.audio = this.handleAudio();
    $(this.container).html(this.$wrapper);
    this.video.play();
  }
  handleEnd(){
    if((!this.audio || this.audio.currentTime >= this.audio.duration) && 
      (!this.video || this.video.currentTime >= this.video.duration)){
        this.onEnd();
      }
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
      this.video.addEventListener('play', ()=>{
        audio.play()
      });
      audio.addEventListener('ended', this.handleEnd)
      return audio
    }
  }
  handleVideo({ src } = this.description){
    if(src){
      const $video = $(`<video><source src=${src}/></video>`);
      this.$wrapper.append($video);
      const video = $video.get(0);
      video.addEventListener('play', this.handleAttrs);
      video.addEventListener('ended', this.handleEnd)
      return video;
    }
  }
}