export type PLCReadConfig = {
  readModbus: {
    holdingRegisters: {
      start: number;
      length: number;
    };
    coils: {
      start: number;
      length: number;
    };
  };
};
