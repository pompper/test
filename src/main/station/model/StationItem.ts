import { PLCCommand } from '../../engine/model/PLCCommand';

export type StationInfo = {
  id: string;
  address: string;
  code: string;
  type: string;
  version: string;
  lastUpdateTimestamp: number;
};

export type PLCReadType = 'holdingRegisters' | 'inputRegisters' | 'coils';

// export type RFIDDataMapConfig = {
//   type: PLCReadType;
//   start: number;
//   length: number;
// };

export type SlotDataMap = {
  id: string;
  localId: number;
  rfidConfig: PLCCommand;
};

export type CabinetDataMap = {
  id: string;
  localId: number;
  plcUnitId: number;
  slots: SlotDataMap[];
};

export type StationDataMap = {
  cabinets: CabinetDataMap[];
};

export type Slot = {
  id: string;
  localId: number;
  rfid: string;
};

export type Cabinet = {
  id: number;
  localId: number;
  slots: Slot[];
  lastUpdateTimestamp: number;
};

export type StationLiveData = {
  cabinets: Cabinet[];
};
