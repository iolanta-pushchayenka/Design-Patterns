export default class DocumentDecorator {
  constructor(document) {
    this.document = document;
  }

  getInfo() {
    return this.document.getInfo();
  }
}

