import $ from 'jquery'

export default class VideoScene {
  constructor(data, description, container) {
    this.description = description;
    this.container = container;
    this.data = data;
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
  handleVideoDOM({ src } = this.description){
    const $video = $(`<video controls autoplay><source src=${src()}/></video>`);
    this.$wrapper.append($video);
    const video = $video.get(0);
    video.addEventListener('ended', this.onEnd);
    video.addEventListener('started', this.handleAttrs);
    video.play();
    return $video;
  }
}