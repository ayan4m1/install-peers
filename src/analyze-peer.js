import path from 'path';

import Analyzer from './Analyzer';

export default class PeerAnalyzer extends Analyzer {
  constructor() {
    super();
    this.packageJson = path.resolve('');
  }

  get packages() {

  }
}
