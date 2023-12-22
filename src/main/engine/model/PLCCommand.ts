export enum PLCDeviceType {
  coils = 'coils',
  discreteInputs = 'discreteInputs',
  holdingRegisters = 'holdingRegisters',
  inputRegisters = 'inputRegisters',
}

export type PLCCommand = {
  type: PLCDeviceType;
  start: number;
  length?: number;
};
