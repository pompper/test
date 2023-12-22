import Engine from '../engine/Engine';
import UpdaterLoop from '../engine/UpdaterLoop';
import { LoopEntity } from '../engine/interfaces/LoopEntity';
import PLCDataTransmitter from './PLCDataTransmitter';
import StationDataMapper from './StationDataMapper';
import LiveDataRepository from './data/LiveDataRepository';
import { StationInfo } from './model/StationItem';

/**
 * This class is responsible for the station logic.
 */
export default class StationController implements LoopEntity {
  info!: StationInfo;
  public readonly liveData!: LiveDataRepository;
  private readonly transmitter!: PLCDataTransmitter;
  constructor(private engine: Engine) {
    const stationDataMapper = new StationDataMapper(
      engine.settings.getStationDataMap(),
      this.liveData,
    );
    this.transmitter = new PLCDataTransmitter(engine, stationDataMapper);
  }
  update(): void {}
}
