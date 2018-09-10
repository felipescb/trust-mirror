export default class VideoScene {
  constructor(description, container) {
    this.description = description;
    this.container = container;
  }
  play(container) {
    const video = this.createVideoDOM()
    container.innerHTML = '';
    container.appendChild(video);
    video.addEventListener('ended', this.onEnd);
    video.play();
  }
  createVideoDOM(description = this.description){
    const videoPlayerElement = document.createElement('video');
    const source = document.createElement('source');
    source.setAttribute('src', description.src);
    videoPlayerElement.innerHTML = source.outerHTML;
    return videoPlayerElement;
  }
}