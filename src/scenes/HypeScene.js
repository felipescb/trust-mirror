export default class HypeScene {
  constructor(description){
    this.description = description;
  }
  play() {
    console.log('playing hype', this.description)
  }
}