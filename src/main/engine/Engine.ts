import UpdaterLoop from './UpdaterLoop';
import { LoopEntity } from './interfaces/LoopEntity';
import MainIpcController from './MainIpcController';
import PLCController from './PLCController';
import SettingsRepository from './data/SettingsRepository';
import PLCModbusConnectionHandler from './PLC/PLCModbusConnectionHandler';
import PLCDataRepository from './PLC/PLCDataRepository';
import ISettingRepository from './interfaces/ISettingRepository';
import { EngineConfig } from './model/EngineConfig';

export default class Engine implements LoopEntity {
  public testValue!: number;

  public readonly settings!: ISettingRepository;
  public readonly updaterLoop!: UpdaterLoop;
  // public readonly mainIpc!: MainIpcController;
  public readonly plc!: PLCController;
  public configs!: EngineConfig;

  constructor() {
    this.testValue = 0;

    this.settings = new SettingsRepository();
    // this.mainIpc = new MainIpcController();
    this.configs = {
      isSandboxOn: false,
      isAutoReconnectPLC: this.settings.data.autoReconnectPLC,
    };
    this.plc = new PLCController(
      new PLCModbusConnectionHandler(
        this.settings.getPlcConnections(),
        this.settings.getPlcReadConfig(),
      ),
      new PLCDataRepository(),
      this,
    );

    this.updaterLoop = new UpdaterLoop(this);
    this.updaterLoop.start();
  }

  update() {
    this.plc.update();
  }
}
