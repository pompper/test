export default interface PLCReadStrategy {
  instance: Record<number, number[]>;

  setPLCData(slaveId: number, data: number[]): void;
  getPLCData(slaveId: number): number[];

  // getBatteryRFIDList(slaveId: number): string[];
  // getClock(slaveId: number): number[];
}
