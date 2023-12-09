import PLCReadStrategy from '../PLCReadStrategy';

export default class PLCData implements PLCReadStrategy {
  instance!: Record<number, number[]>;

  constructor() {
    this.instance = [];
  }
  setPLCData(slaveId: number, data: number[]): void {
    this.instance[slaveId] = data;
  }

  getPLCData(slaveId: number): number[] {
    throw new Error('Method not implemented.');
  }
}
