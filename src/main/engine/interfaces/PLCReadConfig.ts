export type PLCReadConfig = {
  readModbus: {
    holdingRegisters: {
      start: number;
      end: number;
    };
    coils: {
      start: number;
      end: number;
    };
  };
};
