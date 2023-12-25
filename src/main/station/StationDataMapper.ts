import { ModbusPLCDataModel } from '../engine/PLC/ModbusPLCDataModel';
import { PLCCommand } from '../engine/model/PLCCommand';
import LiveDataRepository from './data/LiveDataRepository';
import {
  Cabinet,
  CabinetDataMap,
  SlotDataMap,
  StationDataMap,
  StationLiveData,
} from './model/StationItem';

export default class StationDataMapper {
  constructor(
    private config: StationDataMap,
    private liveData: LiveDataRepository,
  ) {}

  getCabinetDataMapByLocalId(localId: number): CabinetDataMap | undefined {
    return this.config.cabinets.find((cabinet) => cabinet.localId === localId);
  }

  getSlotsDataMapByCabinetLocalId(
    cabinetLocalId: number,
  ): CabinetDataMap | undefined {
    return this.config.cabinets.find(
      (cabinet) => cabinet.localId === cabinetLocalId,
    );
  }

  getPLCCommandFromCabinetLocalIdAndSlotLocalId(
    cabinetLocalId: number,
    slotLocalId: number,
  ): PLCCommand | undefined {
    const cabinet = this.getCabinetDataMapByLocalId(cabinetLocalId);
    if (!cabinet) {
      return undefined;
    }
    return cabinet.slots.find((slot) => slot.localId === slotLocalId)
      ?.rfidConfig;
  }

  map(plcData: ModbusPLCDataModel): void {
    const { unitId } = plcData;
    const cabinetDataMap = this.getCabinetDataMapByLocalId(unitId);
    if (!cabinetDataMap) {
      throw new Error(`Cabinet DataMap with localId ${unitId} not found`);
    }

    const slotsDataMap = cabinetDataMap.slots;

    // iterate through slotsDataMap to map each slot data from modbus to local station data
    slotsDataMap.map((slotDataMap: SlotDataMap) => {
      const { rfidConfig, localId } = slotDataMap;
      const { start, length, type } = rfidConfig;
      const rfidWords = (plcData.data[type] as number[]).slice(
        start,
        start + length!,
      );
      const rfid = rfidWords.join(' ');
      return this.liveData.setSlotRFIDByLocalIdAndCabinetLocalId(
        unitId,
        localId,
        rfid,
      );
    });
  }
}
