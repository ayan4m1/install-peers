const environmentVariable = 'INSTALLING_PEERS';

export default class Locker {
  static claim() {
    if (process.env[environmentVariable]) {
      return false;
    }

    process.env[environmentVariable] = 1;
    return true;
  }

  static release() {
    delete process.env[environmentVariable];
  }
}
