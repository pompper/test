export type PLCDeviceType =
  | 'coils'
  | 'discreteInputs'
  | 'holdingRegisters'
  | 'inputRegisters';

export type PLCCommand = {
  type: PLCDeviceType;
  start: number;
  length?: number;
};
