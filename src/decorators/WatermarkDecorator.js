import DocumentDecorator from './DocumentDecorator.js';

export default class WatermarkDecorator extends DocumentDecorator {
  getInfo() {
    return `${super.getInfo()} [Watermark added]`;
  }
}

