export type ModbusPLCDataModel = {
  unitId: number;
  data: {
    holdingRegisters?: number[];
    coils?: boolean[];
    discreteInputs?: number[];
    inputRegisters?: number[];
  };
};
