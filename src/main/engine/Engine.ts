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

    this.plc = new PLCController(
      new PLCModbusConnection(this.settings.getPlcConnections()),
      new PLCData(),
    );

    this.updaterLoop = new UpdaterLoop(this);
    this.updaterLoop.start();
  }

  update() {
    this.plc.update();
  }
}
