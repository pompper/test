export default interface PLCCommandTemplate {
  getRFID(slaveId: number, slotId: number): number[];
}
