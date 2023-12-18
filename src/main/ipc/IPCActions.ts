import IEngineController from '../engine/interfaces/IEngineController';

export enum IPCActionTopic {
  connect = 'engine:connect',
  ping = 'engine:ping',
  getSettings = 'engine:getSettings',
}

export type IPCAction<T = any, U = any> = {
  topic: IPCActionTopic;
  action: (arg: T) => U;
};

export default class IPCActionBuilder {
  private ipcActions!: IPCAction<any, any>[];
  constructor(private engineController: IEngineController) {
    this.buildIPCHandler();
  }
  buildIPCHandler() {
    this.ipcActions = [
      {
        topic: IPCActionTopic.connect,
        action: (unitId: number) => this.engineController.connect(unitId),
      },
      {
        topic: IPCActionTopic.ping,
        action: (unitId: number) => this.engineController.ping(unitId),
      },
      {
        topic: IPCActionTopic.getSettings,
        action: () => this.engineController.getSettings(),
      },
    ];
  }

  getIpcActions(): IPCAction<any, any>[] {
    return this.ipcActions;
  }
}
