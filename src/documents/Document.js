export default class Document {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  getInfo() {
    return `Title: ${this.title}, Content: ${this.content}`;
  }
}


