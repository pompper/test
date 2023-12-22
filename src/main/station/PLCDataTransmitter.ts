import Engine from '../engine/Engine';
import { ModbusPLCDataModel } from '../engine/PLC/ModbusPLCDataModel';
import { EngineEventChannel } from '../engine/data/constants';
import StationDataMapper from './StationDataMapper';
import { Cabinet, StationLiveData } from './model/StationItem';

export default class PLCDataTransmitter {
  constructor(
    private engine: Engine,
    private mapper: StationDataMapper,
  ) {
    this.initializeListeners();
  }

  private initializeListeners(): void {
    this.engine.plc.on(
      EngineEventChannel.PLC_DATA_UPDATED,
      (data: ModbusPLCDataModel) => {
        this.mapDataToCabinet(data);
      },
    );
  }
  mapDataToCabinet(plcData: ModbusPLCDataModel) {
    this.mapper.map(plcData);
  }
}
