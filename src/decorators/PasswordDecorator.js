import DocumentDecorator from './DocumentDecorator.js';

export default class PasswordDecorator extends DocumentDecorator {
  constructor(document, password) {
    super(document);
    this.password = password;
  }

  getInfo() {
    return `${super.getInfo()} [Protected with password: ${this.password}]`;
  }
}


