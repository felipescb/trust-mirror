import $ from 'jquery'

export default class VideoScene {
  constructor(description, container) {
    this.description = description;
    this.container = container;
  }
  play() {
    this.$wrapper = $('<div class="video-container"></div>');
    this.handleVideoDOM();
    this.handleAttrs();
    $(this.container).html(this.$wrapper);
  }
  handleAttrs(){
    const attrs = this.description.attrs;
    if(attrs && attrs.length){
      attrs.forEach( attr => {
        const $elem = $(attr.dom);
        setTimeout(() => {
          $elem.appendTo(this.$wrapper);
          if(attr.out){
            setTimeout($elem.remove, attr.out);
          }
        }, attr.in || 0)
      });
    }
  }
  handleVideoDOM({ src } = this.description){
    const $video = $(`<video controls autoplay="true"><source src=${src}/></video>`);
    this.$wrapper.append($video);
    const video = $video.get(0);
    video.addEventListener('ended', this.onEnd);
    return $video;
  }
}