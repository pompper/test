import { ipcMain } from 'electron';
import IEngineController from '../engine/interfaces/IEngineController';
import IPCActionBuilder from './IPCActions';

export default class IPCEngineActionHandler {
  constructor(engineController: IEngineController) {
    const actBuilder = new IPCActionBuilder(engineController);
    const actions = actBuilder.getIpcActions();

    actions.map((a) => {
      return ipcMain.handle(a.topic, (event, args) => a.action(args));
    });
  }
}
