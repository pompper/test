import { ModbusPLCDataModel } from '../PLC/ModbusPLCDataModel';

export default interface PLCReadStrategy {
  instance: Record<number, ModbusPLCDataModel>;

  setPLCData(slaveId: number, data: ModbusPLCDataModel): void;
  getPLCData(slaveId: number): ModbusPLCDataModel;

  // getBatteryRFIDList(slaveId: number): string[];
  // getClock(slaveId: number): number[];
}
