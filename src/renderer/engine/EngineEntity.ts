import MainIpcController from './MainIpcController';

export default class Engine {
  private readonly ipcController!: MainIpcController;

  constructor() {
    this.ipcController = new MainIpcController();
  }
}
