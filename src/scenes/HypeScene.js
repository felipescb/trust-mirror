export default class HypeScene {
  constructor(description, container) {
    this.description = description;
    this.container = container;
  }
  play() {
    console.log('playing hype', this.description)
    this.onEnd();
  }
}