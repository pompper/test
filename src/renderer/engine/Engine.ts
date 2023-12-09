import { EnhancedStore } from '@reduxjs/toolkit';
import { CounterState, increment } from '../features/counter/counterSlice';
import UpdaterLoop from './UpdaterLoop';
import { LoopEntity } from './LoopEntity';
import MainIpcController from './MainIpcController';
import PLCController from './PLCController';
import SettingsRepository from './data/SettingsRepository';
import PLCConnection from './ipc/PLCConnection';
import PLCData from './ipc/PLCData';

export default class Engine implements LoopEntity {
  public testValue!: number;

  public readonly settings!: SettingsRepository;
  public readonly updaterLoop!: UpdaterLoop;
  // public readonly mainIpc!: MainIpcController;
  public readonly plc!: PLCController;

  public readonly reduxStore!: EnhancedStore<{
    counter: CounterState;
  }>;

  constructor({ reduxStore }: { reduxStore: EnhancedStore }) {
    this.testValue = 0;
    this.reduxStore = reduxStore;
    this.settings = new SettingsRepository();
    // this.mainIpc = new MainIpcController();

    const plcConnection = new PLCConnection(this.settings.getPlcConnections());
    const plcReader = new PLCData();

    this.plc = new PLCController(plcConnection, plcReader);

    this.updaterLoop = new UpdaterLoop(this);
    this.updaterLoop.start();
  }

  private updatePLC() {
    this.testValue += 1.5;
    this.reduxStore.dispatch(increment());
  }

  update() {
    this.updatePLC();
    this.plc.update();
  }
}
