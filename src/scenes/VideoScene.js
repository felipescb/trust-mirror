export default class VideoScene {
  constructor(description) {
    this.description = description;
  }
  play() {
    console.log('playing video', this.description)
    this.onEnd();
  }
}