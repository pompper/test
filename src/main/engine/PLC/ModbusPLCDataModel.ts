export type ModbusPLCDataModel = {
  unitId: number;
  data: {
    holdingRegisters: number[];
    // coils: number[];
  };
};
