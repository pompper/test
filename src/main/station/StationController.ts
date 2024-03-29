import Engine from '../engine/Engine';
import UpdaterLoop from '../engine/UpdaterLoop';
import { LoopEntity } from '../engine/interfaces/LoopEntity';
import PLCDataTransmitter from './PLCDataTransmitter';
import StationDataMapper from './StationDataMapper';
import StationHealth from './StationHealth';
import LiveDataRepository from './data/LiveDataRepository';
import { StationInfo } from './model/StationItem';

/**
 * This class is responsible for the station logic.
 */
export default class StationController implements LoopEntity {
  public readonly info!: StationInfo;
  public readonly liveData!: LiveDataRepository;

  private readonly transmitter!: PLCDataTransmitter;
  private readonly health!: StationHealth;

  constructor(private engine: Engine) {
    const dataMap = engine.settings.getStationDataMap();
    const stationHealthConfig = engine.settings.getStationHealthCheckConfig();

    this.liveData = new LiveDataRepository();
    this.liveData.initialize(dataMap);

    this.info = engine.settings.getStationInfo();
    this.health = new StationHealth(stationHealthConfig, engine);

    const stationDataMapper = new StationDataMapper(dataMap, this.liveData);
    this.transmitter = new PLCDataTransmitter(engine, stationDataMapper);
  }

  update(): void {
    // console.log(this.liveData.getCabinetByLocalId(1));
    this.health.update();
  }
}
