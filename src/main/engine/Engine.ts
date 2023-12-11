import UpdaterLoop from './UpdaterLoop';
import { LoopEntity } from './interfaces/LoopEntity';
import MainIpcController from './MainIpcController';
import PLCController from './PLCController';
import SettingsRepository from './data/SettingsRepository';
import PLCModbusConnection from './PLC/PLCModbusConnection';
import PLCData from './PLC/PLCData';
import ISettingRepository from './interfaces/ISettingRepository';

export default class Engine implements LoopEntity {
  public testValue!: number;

  public readonly settings!: ISettingRepository;
  public readonly updaterLoop!: UpdaterLoop;
  // public readonly mainIpc!: MainIpcController;
  public readonly plc!: PLCController;

  constructor() {
    this.testValue = 0;
    this.settings = new SettingsRepository();
    // this.mainIpc = new MainIpcController();

    const plcConnection = new PLCModbusConnection(
      this.settings.getPlcConnections(),
    );
    const plcReader = new PLCData();

    this.plc = new PLCController(plcConnection, plcReader);

    this.updaterLoop = new UpdaterLoop(this);
    this.updaterLoop.start();
  }

  private updatePLC() {
    this.testValue += 1.5;
  }

  update() {
    this.updatePLC();
    this.plc.update();
  }
}
