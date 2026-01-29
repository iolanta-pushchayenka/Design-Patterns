import Document from './Document.js';

export default class DocumentPrototype extends Document {
  clone() {
    return new DocumentPrototype(this.title, this.content);
  }
}


