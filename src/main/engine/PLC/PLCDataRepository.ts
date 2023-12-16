import IPLCDataRepository from '../interfaces/IPLCDataRepository';
import { ModbusPLCDataModel } from './ModbusPLCDataModel';

export default class PLCDataRepository implements IPLCDataRepository {
  instance: Record<number, ModbusPLCDataModel> = [];

  setPLCData(slaveId: number, data: ModbusPLCDataModel): void {
    this.instance[slaveId] = data;
  }

  getPLCData(slaveId: number): ModbusPLCDataModel {
    return this.instance[slaveId];
  }
}
