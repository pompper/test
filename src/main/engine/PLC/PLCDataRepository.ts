import PLCReadStrategy from '../interfaces/PLCReadStrategy';
import { ModbusPLCDataModel } from './ModbusPLCDataModel';

export default class PLCDataRepository implements PLCReadStrategy {
  instance: Record<number, ModbusPLCDataModel> = [];

  setPLCData(slaveId: number, data: ModbusPLCDataModel): void {
    this.instance[slaveId] = data;
  }

  getPLCData(slaveId: number): ModbusPLCDataModel {
    return this.instance[slaveId];
  }
}
