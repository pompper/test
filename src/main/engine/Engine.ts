import UpdaterLoop from './UpdaterLoop';
import { LoopEntity } from './interfaces/LoopEntity';
import PLCController from './PLCController';
import SettingsRepository from './data/SettingsRepository';
import PLCModbusConnectionHandler from './PLC/PLCModbusConnectionHandler';
import PLCDataRepository from './PLC/PLCDataRepository';
import ISettingRepository from './interfaces/ISettingRepository';
import { EngineConfig } from './model/EngineConfig';
import StationController from '../station/StationController';
import API from '../common/API';

export default class Engine implements LoopEntity {
  public readonly settings!: ISettingRepository;
  public readonly updaterLoop!: UpdaterLoop;

  public readonly plc!: PLCController;
  public readonly station!: StationController;
  public configs!: EngineConfig;

  constructor() {
    this.settings = new SettingsRepository();
    this.configs = {
      isSandboxOn: false,
      isAutoReconnectPLC: this.settings.data.autoReconnectPLC,
    };
    API.initialize(this.settings.getBaseBackendURL());

    this.plc = new PLCController(
      new PLCModbusConnectionHandler(
        this.settings.getPlcConnections(),
        this.settings.getPlcReadConfig(),
      ),
      new PLCDataRepository(),
      this,
    );

    this.station = new StationController(this);

    this.updaterLoop = new UpdaterLoop(this);
    this.updaterLoop.start();
  }

  update() {
    this.plc.update();
    this.station.update();
  }
}
